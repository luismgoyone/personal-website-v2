import { cn } from "@/lib/utils";

// The site's one layout primitive: a mono label in the left margin and a
// reading column beside it. On phones the label sits above the column.
export function Row({
  label,
  children,
  className,
  as: Tag = "section",
  id,
}: {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "footer" | "header";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("mt-14 flex flex-col gap-2 sm:flex-row sm:gap-10", className)}>
      <div className="shrink-0 sm:w-[164px] sm:pt-0.5">
        {label && <div className="meta">{label}</div>}
      </div>
      <div className="min-w-0 max-w-[620px] flex-1">{children}</div>
    </Tag>
  );
}
