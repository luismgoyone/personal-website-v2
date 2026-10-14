"use client";

import { useState } from "react";
import { cursorPipeline, pipeline } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PipelineTrace } from "./PipelineTrace";

// One trace per job; the caption under each comes from the page.
const setups = [
  { id: "chief", label: "Chief · Claude Code", steps: pipeline, brief: true },
  { id: "24metrics", label: "24metrics · Cursor", steps: cursorPipeline, brief: false },
] as const;

export function PipelineSwitch({ captions }: { captions: Record<(typeof setups)[number]["id"], React.ReactNode> }) {
  const [active, setActive] = useState<(typeof setups)[number]["id"]>("chief");
  const setup = setups.find((s) => s.id === active) ?? setups[0];

  return (
    <figure>
      <div role="group" aria-label="Pick a setup" className="mb-3 flex flex-wrap gap-2">
        {setups.map((s) => {
          const on = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(s.id)}
              className={cn(
                "min-h-9 rounded-full border px-3 font-mono text-[12px] transition-colors",
                on
                  ? "border-foreground bg-foreground text-background"
                  : "border-line bg-surface text-body hover:border-faint",
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>
      <PipelineTrace steps={setup.steps} brief={setup.brief} label={`How a ticket ships at ${setup.label}`} />
      <figcaption className="mt-2.5 text-sm text-muted">{captions[setup.id]}</figcaption>
    </figure>
  );
}
