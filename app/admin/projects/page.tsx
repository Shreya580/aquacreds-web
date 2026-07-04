"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shell";
import { ProjectList } from "@/components/project-row";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { ProjectStatus } from "@/lib/types";

const FILTERS: { key: "all" | ProjectStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "verified", label: "Awaiting approval" },
  { key: "issued", label: "Issued" },
  { key: "pending", label: "Pending verify" },
  { key: "admin-rejected", label: "Rejected" },
];

export default function AdminProjects() {
  const { projects } = useStore();
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <PageHeader title="All projects" subtitle="Every project in the registry." />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition",
              filter === f.key
                ? "bg-ocean-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ProjectList projects={shown} hrefBase="/admin/projects" empty="No projects match." />
    </>
  );
}
