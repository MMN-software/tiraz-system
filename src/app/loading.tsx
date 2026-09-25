import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2
          className="w-10 h-10 text-brand-600 animate-spin mx-auto mb-4"
          aria-hidden="true"
        />
        <p className="text-sm text-ink-500">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
