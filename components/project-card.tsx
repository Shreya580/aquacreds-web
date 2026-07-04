import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { num } from "@/lib/format";
import { Project } from "@/lib/types";

const ecoEmoji: Record<Project["ecosystem"], string> = {
  Mangrove: "🌳",
  Seagrass: "🌾",
  "Salt marsh": "🪺",
};

export function ProjectCard({ project, href }: { project: Project; href: string }) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full transition group-hover:border-ocean-300 group-hover:shadow-md">
        <CardBody className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-2">
            <span className="text-2xl">{ecoEmoji[project.ecosystem]}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="mt-3 font-semibold text-ink group-hover:text-ocean-700">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500">
            {project.district}, {project.state}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
            <span className="text-slate-500">{project.area} ha</span>
            {project.credits > 0 ? (
              <span className="font-medium text-emerald-700">
                {num(project.credits)} AQC
              </span>
            ) : (
              <span className="text-slate-400">{num(+project.saplings)} saplings</span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
