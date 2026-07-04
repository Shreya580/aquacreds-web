"use client";

import { PageHeader } from "@/components/shell";
import { ProjectList } from "@/components/project-row";
import { useStore } from "@/lib/store";

export default function ReviewedPage() {
  const { projects } = useStore();
  const reviewed = projects.filter((p) =>
    ["verified", "verifier-rejected", "approved", "issued", "admin-rejected"].includes(
      p.status
    )
  );

  return (
    <>
      <PageHeader title="Reviewed" subtitle="Projects you have already assessed." />
      <ProjectList
        projects={reviewed}
        hrefBase="/verifier/review"
        empty="No reviewed projects yet."
      />
    </>
  );
}
