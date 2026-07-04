"use client";

import { PageHeader } from "@/components/shell";
import { Card, CardBody } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function AdminVerifiers() {
  const { users, projects } = useStore();
  const verifiers = users.filter((u) => u.role === "verifier");
  const reviewed = projects.filter((p) =>
    ["verified", "verifier-rejected"].includes(p.status)
  ).length;

  return (
    <>
      <PageHeader
        title="Verifiers"
        subtitle="Accounts authorized to review submissions."
      />
      {verifiers.length === 0 ? (
        <p className="text-sm text-slate-400">No verifiers registered.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verifiers.map((v) => (
            <Card key={v.id}>
              <CardBody>
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-ocean-100 text-lg font-bold text-ocean-700">
                    {v.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{v.name}</p>
                    <p className="truncate text-xs text-slate-500">{v.email}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-sm">
                  <span className="text-slate-500">Total reviews</span>
                  <span className="font-medium text-ink">{reviewed}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
