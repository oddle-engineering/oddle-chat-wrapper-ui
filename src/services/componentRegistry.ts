import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import type {
  ComponentSchema,
  GenerativeComponent,
  GenerativeComponents,
} from "../types";

/**
 * Convert a Zod schema to JSON Schema in a way that works against both Zod v3
 * and Zod v4. Zod v4 ships a built-in `z.toJSONSchema(schema)`; v3 doesn't and
 * relies on the third-party `zod-to-json-schema` package. We prefer the
 * built-in when present so v4 consumers don't carry around an extra
 * conversion path that wasn't designed for their schema internals.
 *
 * Typed as `unknown` so the public `GenerativeComponent.propsSchema` shape
 * (`ZodSchemaLike`, kept zod-import-free) flows through without forcing a
 * cast at every callsite. The runtime guarantee is that callers pass a real
 * Zod schema; both code paths handle it.
 */
function convertZodToJsonSchema(schema: unknown): Record<string, any> {
  const v4 = (z as { toJSONSchema?: (s: unknown) => unknown }).toJSONSchema;
  if (typeof v4 === "function") {
    return v4(schema) as Record<string, any>;
  }
  return zodToJsonSchema(schema as never, {
    $refStrategy: "none",
  }) as Record<string, any>;
}

/**
 * Holds the dashboard's registered generative components and exposes:
 *  - the React components, looked up by name when an agent asks to render one;
 *  - their JSON-Schema-converted prop schemas, sent to the chat-server so the
 *    agent knows what props each component accepts.
 *
 * Zod → JSON Schema conversion runs once per registration to avoid repeating
 * the work on every render.
 */
export class ComponentRegistry {
  private readonly entries = new Map<string, GenerativeComponent<any>>();
  private readonly schemas: ComponentSchema[] = [];

  constructor(components: GenerativeComponents = []) {
    components.forEach((c) => this.add(c));
  }

  private add(component: GenerativeComponent<any>): void {
    if (this.entries.has(component.name)) {
      return;
    }
    this.entries.set(component.name, component);
    this.schemas.push({
      name: component.name,
      description: component.description,
      propsSchemaJson: convertZodToJsonSchema(component.propsSchema),
    });
  }

  get(name: string): GenerativeComponent<any> | undefined {
    return this.entries.get(name);
  }

  has(name: string): boolean {
    return this.entries.has(name);
  }

  getSchemas(): ComponentSchema[] {
    return this.schemas;
  }

  size(): number {
    return this.entries.size;
  }
}
