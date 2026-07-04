import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { date, num } from "@/lib/format";
import { Project } from "@/lib/types";

export function ProjectList({
  projects,
  hrefBase,
  empty = "Nothing here yet.",
}: {
  projects: Project[];
  hrefBase: string; // e.g. "/verifier/review"
  empty?: string;
}) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center text-sm text-slate-400">
        {empty}
      </div>
    );
  }

  return (
    <Card className="divide-y divide-slate-100 overflow-hidden">
      {projects.map((p) => (
        <Link
          key={p.id}
          href={`${hrefBase}/${p.id}`}
          className="flex items-center justify-between gap-4 p-4 transition hover:bg-slate-50"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{p.title}</p>
            <p className="truncate text-xs text-slate-500">
              {p.orgName} · {p.district}, {p.state} · {date(p.createdAt)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden text-sm text-slate-500 sm:block">
              {p.area} ha · {num(+p.saplings || 0)} saplings
            </span>
            <StatusBadge status={p.status} />
            <span className="text-ocean-600">→</span>
          </div>
        </Link>
      ))}
    </Card>
  );
}
