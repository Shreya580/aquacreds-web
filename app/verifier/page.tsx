"use client";

import { PageHeader } from "@/components/shell";
import { ProjectList } from "@/components/project-row";
import { Stat } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function VerifierQueue() {
  const { projects } = useStore();
  const pending = projects.filter((p) => p.status === "pending");
  const reviewed = projects.filter((p) =>
    ["verified", "verifier-rejected"].includes(p.status)
  );

  return (
    <>
      <PageHeader
        title="Pending queue"
        subtitle="Review submitted projects and pass or reject them."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Stat label="Awaiting review" value={pending.length} />
        <Stat label="Reviewed by you" value={reviewed.length} />
      </div>
      <ProjectList
        projects={pending}
        hrefBase="/verifier/review"
        empty="🎉 Queue clear — no projects awaiting review."
      />
    </>
  );
}
