import { pipeline } from "@/lib/data";
import { cn } from "@/lib/utils";

// The agent pipeline drawn as a run log: one row per stage, the human last.
// Steps with depth 1 run inside the stage above them and hang off its rail;
// the brief trace (home page) leaves them out and shows each stage's `brief`.
export function PipelineTrace({ brief = false }: { brief?: boolean }) {
  const steps = brief ? pipeline.filter((s) => s.depth !== 1) : pipeline;
  return (
    <div
      role="list"
      aria-label="How a ticket ships"
      className="overflow-x-auto rounded-xl border border-line bg-surface px-4 py-4 font-mono text-[12px] leading-relaxed text-body sm:px-5 sm:text-[13px]"
    >
      {steps.map((step, i) => {
        const nested = step.depth === 1;
        const lastNested = nested && steps[i + 1]?.depth !== 1;
        const glyph = nested ? "│" : i === 0 ? "▸" : i === steps.length - 1 ? "└" : "├";
        return (
          <div
            key={step.agent}
            role="listitem"
            className={cn(
              "grid grid-cols-[2ch_18ch_minmax(0,1fr)] gap-x-2 py-0.5 sm:grid-cols-[2.5ch_19ch_minmax(0,1fr)_auto] sm:gap-x-2.5",
              step.human && "font-medium text-foreground",
            )}
          >
            <span aria-hidden="true" className={step.human ? "text-accent" : i === 0 ? "text-foreground" : "text-tree"}>
              {glyph}
            </span>
            <span className={cn("whitespace-nowrap", step.human && "text-accent")}>
              {nested && (
                <span aria-hidden="true" className="text-tree">
                  {lastNested ? "└ " : "├ "}
                </span>
              )}
              {step.agent}
            </span>
            <span>{(brief && step.brief) || step.does}</span>
            <span className={cn("hidden sm:block", step.human ? "text-accent" : "text-faint")}>{step.output}</span>
          </div>
        );
      })}
    </div>
  );
}
