import { Loader } from "./Loader";

interface InlineLoaderProps {
  size?: number;
  fullHeight?: boolean;
}

export const InlineLoader = ({
  size = 20,
  fullHeight = false,
}: InlineLoaderProps) => {
  return (
    <div
      className={`chat-wrapper__inline-loader ${
        fullHeight ? "chat-wrapper__inline-loader--full-height" : ""
      }`}
    >
      <div className="chat-wrapper__inline-loader-content">
        <Loader size={size} variant="dots" />
      </div>
    </div>
  );
};
