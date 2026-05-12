import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { z } from "zod";

export const ChartCardV0DatumSchema = z.object({
  label: z
    .string()
    .describe(
      "X-axis category or time-bucket label (e.g. \"Mon\", \"Week 1\", \"Espresso\"). Keep short — long labels are decimated to fit.",
    ),
  value: z
    .number()
    .describe(
      "Y-axis numeric value for this datum. Negative values are supported.",
    ),
});

export const ChartCardV0ValueFormatSchema = z.object({
  style: z
    .enum(["decimal", "currency", "percent"])
    .optional()
    .describe(
      "Number-formatting style applied to y-axis ticks and tooltip value. Defaults to \"decimal\".",
    ),
  currency: z
    .string()
    .optional()
    .describe(
      "ISO-4217 currency code (e.g. \"USD\", \"SGD\"). Required when style === \"currency\".",
    ),
  maximumFractionDigits: z
    .number()
    .int()
    .min(0)
    .max(4)
    .optional()
    .describe(
      "Maximum decimal places shown in formatted values. Defaults to 0 for decimal/currency, 1 for percent.",
    ),
});

export const ChartCardV0PropsSchema = z.object({
  type: z
    .enum(["bar", "line"])
    .describe(
      "\"bar\" for category comparisons (counts, totals across discrete buckets) or \"line\" for trends over an ordered series (time, sequence). Pick line when the x-axis order is meaningful and continuous; bar when it is categorical.",
    ),
  title: z
    .string()
    .optional()
    .describe(
      "Optional bold title shown above the chart (e.g. \"Reservations this week\"). Plain text only.",
    ),
  subtitle: z
    .string()
    .optional()
    .describe(
      "Optional secondary line shown under the title (e.g. unit hint, date range). Plain text only.",
    ),
  data: z
    .array(ChartCardV0DatumSchema)
    .min(1)
    .max(60)
    .describe(
      "Single-series data points, in display order. Provide 1–60 datapoints.",
    ),
  xAxisLabel: z
    .string()
    .optional()
    .describe("Optional caption shown beneath the x-axis."),
  yAxisLabel: z
    .string()
    .optional()
    .describe("Optional caption shown to the left of the y-axis."),
  valueFormat: ChartCardV0ValueFormatSchema.optional().describe(
    "Controls how y-axis ticks and tooltip values are formatted. Use { style: \"currency\", currency: \"SGD\" } for money, { style: \"percent\" } for ratios (values are multiplied by 100 by Intl).",
  ),
});

export type ChartCardV0Props = z.infer<typeof ChartCardV0PropsSchema>;
export type ChartCardV0Datum = z.infer<typeof ChartCardV0DatumSchema>;
export type ChartCardV0ValueFormat = z.infer<typeof ChartCardV0ValueFormatSchema>;

const DEFAULT_WIDTH = 480;
const ASPECT_RATIO = 9 / 16; // height = width * ratio
const MARGIN = { top: 16, right: 16, bottom: 36, left: 48 };
const Y_TICK_COUNT = 5;
const MAX_X_LABELS = 8;

function buildFormatter(format?: ChartCardV0ValueFormat): Intl.NumberFormat {
  const style = format?.style ?? "decimal";
  const fractionDigits =
    format?.maximumFractionDigits ?? (style === "percent" ? 1 : 0);
  const opts: Intl.NumberFormatOptions = {
    style,
    maximumFractionDigits: fractionDigits,
  };
  if (style === "currency") {
    opts.currency = format?.currency ?? "USD";
  }
  try {
    return new Intl.NumberFormat(undefined, opts);
  } catch {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  }
}

function clean(data: ChartCardV0Datum[] | undefined): ChartCardV0Datum[] {
  if (!Array.isArray(data)) return [];
  return data.filter(
    (d): d is ChartCardV0Datum =>
      !!d && typeof d.label === "string" && typeof d.value === "number" &&
      Number.isFinite(d.value),
  );
}

export function ChartCardV0(props: Partial<ChartCardV0Props>) {
  const titleId = useId();
  const descId = useId();

  const type = props.type === "line" ? "line" : "bar";
  const data = useMemo(() => clean(props.data), [props.data]);
  const formatter = useMemo(
    () => buildFormatter(props.valueFormat),
    [props.valueFormat],
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const next = Math.max(240, Math.floor(entry.contentRect.width));
      setWidth(next);
    });
    ro.observe(el);
    setWidth(Math.max(240, Math.floor(el.getBoundingClientRect().width) || DEFAULT_WIDTH));
    return () => ro.disconnect();
  }, []);

  const height = Math.round(width * ASPECT_RATIO);
  const innerWidth = Math.max(0, width - MARGIN.left - MARGIN.right);
  const innerHeight = Math.max(0, height - MARGIN.top - MARGIN.bottom);

  const values = data.map((d) => d.value);
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(0, ...values);
  const yDomain: [number, number] = data.length
    ? minValue === maxValue
      ? [minValue, maxValue + 1]
      : [minValue, maxValue]
    : [0, 1];

  const yScale = useMemo(
    () => scaleLinear().domain(yDomain).range([innerHeight, 0]).nice(Y_TICK_COUNT),
    [yDomain[0], yDomain[1], innerHeight],
  );

  const xBandScale = useMemo(
    () =>
      scaleBand<string>()
        .domain(data.map((_, i) => String(i)))
        .range([0, innerWidth])
        .padding(type === "bar" ? 0.2 : 0.5),
    [data.length, innerWidth, type],
  );

  const yTicks = yScale.ticks(Y_TICK_COUNT);
  const labelStride = Math.max(1, Math.ceil(data.length / MAX_X_LABELS));
  const baseY = yScale(0);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Reset hover when the dataset shrinks below the previously focused index.
  useEffect(() => {
    if (hoveredIndex !== null && hoveredIndex >= data.length) {
      setHoveredIndex(null);
    }
  }, [data.length, hoveredIndex]);

  function onPointerMove(event: React.PointerEvent<SVGRectElement>) {
    if (!data.length) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    if (rect.width <= 0) return;
    const ratio = localX / rect.width;
    const idx = Math.min(
      data.length - 1,
      Math.max(0, Math.floor(ratio * data.length)),
    );
    setHoveredIndex(idx);
  }

  function onPointerLeave() {
    setHoveredIndex(null);
  }

  const focusedDatum = hoveredIndex !== null ? data[hoveredIndex] : null;
  const focusedX =
    hoveredIndex !== null
      ? xBandScale(String(hoveredIndex))! + xBandScale.bandwidth() / 2
      : 0;

  if (!data.length) {
    return (
      <div
        ref={wrapperRef}
        className="chat-wrapper__chart-card-v0 chat-wrapper__chart-card-v0--empty"
        role="status"
      >
        <div className="chat-wrapper__chart-card-v0-empty-text">
          {props.title ? props.title : "Chart"}
          <span className="chat-wrapper__chart-card-v0-empty-hint">
            (no data)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="chat-wrapper__chart-card-v0"
      data-chart-type={type}
    >
      {(props.title || props.subtitle) && (
        <div className="chat-wrapper__chart-card-v0-header">
          {props.title ? (
            <div
              id={titleId}
              className="chat-wrapper__chart-card-v0-title"
            >
              {props.title}
            </div>
          ) : null}
          {props.subtitle ? (
            <div
              id={descId}
              className="chat-wrapper__chart-card-v0-subtitle"
            >
              {props.subtitle}
            </div>
          ) : null}
        </div>
      )}

      <div className="chat-wrapper__chart-card-v0-canvas">
        <svg
          className="chat-wrapper__chart-card-v0-svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={props.title ? titleId : undefined}
          aria-describedby={props.subtitle ? descId : undefined}
        >
          <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
            <g className="chat-wrapper__chart-card-v0-axis chat-wrapper__chart-card-v0-axis--y">
              {yTicks.map((tick) => {
                const y = yScale(tick);
                return (
                  <g
                    key={`y-${tick}`}
                    className="chat-wrapper__chart-card-v0-tick"
                    transform={`translate(0, ${y})`}
                  >
                    <line
                      className="chat-wrapper__chart-card-v0-gridline"
                      x1={0}
                      x2={innerWidth}
                      y1={0}
                      y2={0}
                    />
                    <text
                      className="chat-wrapper__chart-card-v0-tick-label chat-wrapper__chart-card-v0-tick-label--y"
                      x={-8}
                      y={0}
                      dy="0.32em"
                      textAnchor="end"
                    >
                      {formatter.format(tick)}
                    </text>
                  </g>
                );
              })}
              {props.yAxisLabel ? (
                <text
                  className="chat-wrapper__chart-card-v0-axis-label"
                  transform={`translate(${-MARGIN.left + 12}, ${innerHeight / 2}) rotate(-90)`}
                  textAnchor="middle"
                >
                  {props.yAxisLabel}
                </text>
              ) : null}
            </g>

            <g className="chat-wrapper__chart-card-v0-axis chat-wrapper__chart-card-v0-axis--x">
              <line
                className="chat-wrapper__chart-card-v0-axis-line"
                x1={0}
                x2={innerWidth}
                y1={baseY}
                y2={baseY}
              />
              {data.map((d, i) => {
                if (i % labelStride !== 0) return null;
                const cx =
                  xBandScale(String(i))! + xBandScale.bandwidth() / 2;
                return (
                  <text
                    key={`x-${i}`}
                    className="chat-wrapper__chart-card-v0-tick-label chat-wrapper__chart-card-v0-tick-label--x"
                    x={cx}
                    y={innerHeight + 18}
                    textAnchor="middle"
                  >
                    {d.label}
                  </text>
                );
              })}
              {props.xAxisLabel ? (
                <text
                  className="chat-wrapper__chart-card-v0-axis-label"
                  x={innerWidth / 2}
                  y={innerHeight + MARGIN.bottom - 2}
                  textAnchor="middle"
                >
                  {props.xAxisLabel}
                </text>
              ) : null}
            </g>

            {type === "bar" ? (
              <BarSeries
                data={data}
                xScale={xBandScale}
                yScale={yScale}
                baseY={baseY}
                hoveredIndex={hoveredIndex}
                onFocus={setHoveredIndex}
                onBlur={onPointerLeave}
                describeValue={(d) =>
                  `${d.label}: ${formatter.format(d.value)}`
                }
              />
            ) : (
              <LineSeries
                data={data}
                xScale={xBandScale}
                yScale={yScale}
                hoveredIndex={hoveredIndex}
                onFocus={setHoveredIndex}
                onBlur={onPointerLeave}
                describeValue={(d) =>
                  `${d.label}: ${formatter.format(d.value)}`
                }
              />
            )}

            {focusedDatum ? (
              <line
                className="chat-wrapper__chart-card-v0-focus-line"
                x1={focusedX}
                x2={focusedX}
                y1={0}
                y2={innerHeight}
              />
            ) : null}

            <rect
              className="chat-wrapper__chart-card-v0-overlay"
              x={0}
              y={0}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
            />
          </g>
        </svg>

        {focusedDatum ? (
          <div
            className="chat-wrapper__chart-card-v0-tooltip"
            role="tooltip"
            style={{
              left: MARGIN.left + focusedX,
              top: MARGIN.top,
            }}
          >
            <div className="chat-wrapper__chart-card-v0-tooltip-label">
              {focusedDatum.label}
            </div>
            <div className="chat-wrapper__chart-card-v0-tooltip-value">
              {formatter.format(focusedDatum.value)}
            </div>
          </div>
        ) : null}
      </div>

      <table className="chat-wrapper__chart-card-v0-sr-table">
        <caption>
          {props.title ?? "Chart data"}
          {props.subtitle ? ` — ${props.subtitle}` : ""}
        </caption>
        <thead>
          <tr>
            <th scope="col">{props.xAxisLabel ?? "Label"}</th>
            <th scope="col">{props.yAxisLabel ?? "Value"}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={`sr-${i}`}>
              <th scope="row">{d.label}</th>
              <td>{formatter.format(d.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SeriesProps {
  data: ChartCardV0Datum[];
  xScale: ReturnType<typeof scaleBand<string>>;
  yScale: ReturnType<typeof scaleLinear<number, number>>;
  hoveredIndex: number | null;
  onFocus: (index: number) => void;
  onBlur: () => void;
  describeValue: (d: ChartCardV0Datum) => string;
}

interface BarSeriesProps extends SeriesProps {
  baseY: number;
}

function BarSeries({
  data,
  xScale,
  yScale,
  baseY,
  hoveredIndex,
  onFocus,
  onBlur,
  describeValue,
}: BarSeriesProps) {
  const bw = xScale.bandwidth();
  return (
    <g className="chat-wrapper__chart-card-v0-series chat-wrapper__chart-card-v0-series--bar">
      {data.map((d, i) => {
        const x = xScale(String(i)) ?? 0;
        const yTop = yScale(Math.max(0, d.value));
        const yBottom = yScale(Math.min(0, d.value));
        const h = Math.max(0, yBottom - yTop);
        const isActive = hoveredIndex === i;
        return (
          <rect
            key={`bar-${i}`}
            className={
              isActive
                ? "chat-wrapper__chart-card-v0-bar chat-wrapper__chart-card-v0-bar--active"
                : "chat-wrapper__chart-card-v0-bar"
            }
            x={x}
            y={d.value >= 0 ? yTop : baseY}
            width={bw}
            height={h}
            tabIndex={0}
            role="img"
            aria-label={describeValue(d)}
            onFocus={() => onFocus(i)}
            onBlur={onBlur}
            onMouseEnter={() => onFocus(i)}
          />
        );
      })}
    </g>
  );
}

function LineSeries({
  data,
  xScale,
  yScale,
  hoveredIndex,
  onFocus,
  onBlur,
  describeValue,
}: SeriesProps) {
  const points = data.map((d, i) => {
    const cx = (xScale(String(i)) ?? 0) + xScale.bandwidth() / 2;
    const cy = yScale(d.value);
    return { cx, cy, datum: d, index: i };
  });
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.cx} ${p.cy}`)
    .join(" ");
  return (
    <g className="chat-wrapper__chart-card-v0-series chat-wrapper__chart-card-v0-series--line">
      <path className="chat-wrapper__chart-card-v0-line" d={pathD} />
      {points.map((p) => {
        const isActive = hoveredIndex === p.index;
        return (
          <circle
            key={`pt-${p.index}`}
            className={
              isActive
                ? "chat-wrapper__chart-card-v0-point chat-wrapper__chart-card-v0-point--active"
                : "chat-wrapper__chart-card-v0-point"
            }
            cx={p.cx}
            cy={p.cy}
            r={isActive ? 5 : 3}
            tabIndex={0}
            role="img"
            aria-label={describeValue(p.datum)}
            onFocus={() => onFocus(p.index)}
            onBlur={onBlur}
            onMouseEnter={() => onFocus(p.index)}
          />
        );
      })}
    </g>
  );
}
