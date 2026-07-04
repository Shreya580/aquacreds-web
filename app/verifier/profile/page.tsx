"use client";

import { PageHeader } from "@/components/shell";
import { Card, CardBody } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function VerifierProfile() {
  const { user, projects } = useStore();
  const reviewed = projects.filter((p) =>
    ["verified", "verifier-rejected"].includes(p.status)
  ).length;

  return (
    <>
      <PageHeader title="Profile" subtitle="Verifier account." />
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-ocean-100 text-2xl font-bold text-ocean-700">
              {user!.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-ink">{user!.name}</h2>
              <p className="text-sm text-slate-500">{user!.email}</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-y-3 border-t border-slate-100 pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Role</dt>
              <dd className="font-medium capitalize text-ink">{user!.role}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Projects reviewed</dt>
              <dd className="font-medium text-ink">{reviewed}</dd>
            </div>
          </dl>
        </CardBody>
      </Card>
    </>
  );
}
