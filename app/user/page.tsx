"use client";

import { PageHeader } from "@/components/shell";
import { ProjectCard } from "@/components/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Stat } from "@/components/ui/card";
import { num } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function UserDashboard() {
  const { user, projects } = useStore();
  const mine = projects.filter((p) => p.ownerId === user!.id);

  const issued = mine.filter((p) => p.status === "issued");
  const pending = mine.filter((p) =>
    ["pending", "verified", "approved"].includes(p.status)
  );
  const totalCredits = issued.reduce((s, p) => s + p.credits, 0);

  return (
    <>
      <PageHeader
        title={`Hi, ${user!.name.split(" ")[0]} 👋`}
        subtitle="Track your restoration projects and carbon credits."
        action={<ButtonLink href="/user/add-project">➕ New project</ButtonLink>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="My projects" value={num(mine.length)} />
        <Stat label="Credits earned" value={`${num(totalCredits)} AQC`} />
        <Stat label="Wallet balance" value={`${num(user!.walletBalance)} AQC`} />
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-ink">
          In progress ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <EmptyRow text="No projects awaiting review." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((p) => (
              <ProjectCard key={p.id} project={p} href={`/user/projects/${p.id}`} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-ink">
          Credits issued ({issued.length})
        </h2>
        {issued.length === 0 ? (
          <EmptyRow text="No credits issued yet." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {issued.map((p) => (
              <ProjectCard key={p.id} project={p} href={`/user/projects/${p.id}`} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center text-sm text-slate-400">
      {text}
    </div>
  );
}
