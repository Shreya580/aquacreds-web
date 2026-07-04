"use client";

import { PageHeader } from "@/components/shell";
import { ProjectList } from "@/components/project-row";
import { Stat } from "@/components/ui/card";
import { num } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function AdminOverview() {
  const { projects, users } = useStore();

  const issued = projects.filter((p) => p.status === "issued");
  const totalCredits = issued.reduce((s, p) => s + p.credits, 0);
  const totalArea = projects.reduce((s, p) => s + (+p.area || 0), 0);
  const awaitingAdmin = projects.filter((p) => p.status === "verified");

  // simple ecosystem breakdown
  const byEco = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.ecosystem] = (acc[p.ecosystem] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title="Registry overview"
        subtitle="Platform-wide status of AquaCreds."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total projects" value={num(projects.length)} />
        <Stat label="Credits issued" value={`${num(totalCredits)} AQC`} />
        <Stat label="Area restored" value={`${num(totalArea)} ha`} />
        <Stat label="Registered users" value={num(users.length)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-ink">
            Awaiting admin approval ({awaitingAdmin.length})
          </h2>
          <ProjectList
            projects={awaitingAdmin}
            hrefBase="/admin/projects"
            empty="Nothing awaiting approval."
          />
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-ink">By ecosystem</h2>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
            {Object.entries(byEco).map(([eco, count]) => {
              const pct = Math.round((count / projects.length) * 100);
              return (
                <div key={eco}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-600">{eco}</span>
                    <span className="text-slate-400">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-ocean-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
