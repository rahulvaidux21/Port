import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  children: string;
  className?: string;
}

export function SpeechBubble({ children, className }: SpeechBubbleProps) {
  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <span className="bubble-ring rounded-full px-4 py-1.5 font-sans text-xs font-semibold text-text-secondary">
        {children}
      </span>
    </div>
  );
}
