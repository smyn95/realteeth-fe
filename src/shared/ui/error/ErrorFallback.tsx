import { RefreshCw } from 'lucide-react';

type Props = {
  error: Error;
  onRetry: () => void;
};

export function ErrorFallback(props: Props) {
  const { error, onRetry } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#292d47] p-8 text-white">
      <p className="text-white/90">{error.message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:bg-white/30"
      >
        <RefreshCw className="size-4" />
        다시 시도
      </button>
    </div>
  );
}
