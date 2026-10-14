import { pipeline } from "@/lib/data";
import { cn } from "@/lib/utils";

// The agent pipeline drawn as a run log: one row per stage, the human last.
export function PipelineTrace() {
  return (
    <div
      role="list"
      aria-label="How a ticket ships"
      className="overflow-x-auto rounded-xl border border-line bg-surface px-4 py-4 font-mono text-[12px] leading-relaxed text-body sm:px-5 sm:text-[13px]"
    >
      {pipeline.map((step, i) => {
        const first = i === 0;
        const last = i === pipeline.length - 1;
        return (
          <div
            key={step.agent}
            role="listitem"
            className={cn(
              "grid grid-cols-[16px_70px_minmax(0,1fr)] gap-x-2 py-0.5 sm:grid-cols-[24px_92px_minmax(0,1fr)_auto] sm:gap-x-2.5",
              (first || step.human) && "text-foreground",
              step.human && "font-medium",
            )}
          >
            <span aria-hidden="true" className={step.human ? "text-accent" : first ? "" : "text-tree"}>
              {first ? "▸" : last ? "└" : "├"}
            </span>
            <span className={cn(step.human && "text-accent")}>{step.agent}</span>
            <span>{step.does}</span>
            <span className={cn("hidden sm:block", step.human ? "text-accent" : "text-faint")}>{step.output}</span>
          </div>
        );
      })}
    </div>
  );
}
