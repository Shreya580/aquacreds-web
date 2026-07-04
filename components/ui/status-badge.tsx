import { cn } from "@/lib/cn";
import { ProjectStatus } from "@/lib/types";

const map: Record<ProjectStatus, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-800" },
  verified: { label: "Verified", cls: "bg-sky-100 text-sky-800" },
  "verifier-rejected": { label: "Rejected (verifier)", cls: "bg-rose-100 text-rose-700" },
  approved: { label: "Approved", cls: "bg-indigo-100 text-indigo-800" },
  "admin-rejected": { label: "Rejected (admin)", cls: "bg-rose-100 text-rose-700" },
  issued: { label: "Credits issued", cls: "bg-emerald-100 text-emerald-800" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        s.cls
      )}
    >
      {s.label}
    </span>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ocean-100 px-2.5 py-0.5 text-xs font-medium text-ocean-800",
        className
      )}
    >
      {children}
    </span>
  );
}
