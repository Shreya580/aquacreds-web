"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { useStore } from "@/lib/store";

export default function UserProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { projects } = useStore();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <p className="text-slate-400">Project not found.</p>;
  }

  return (
    <>
      <Link href="/user" className="mb-4 inline-block text-sm text-ocean-700">
        ← Back to dashboard
      </Link>
      <ProjectDetail project={project} />
    </>
  );
}
