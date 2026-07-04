"use client";

import { PageHeader } from "@/components/shell";
import { Card, CardBody } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { user, projects } = useStore();
  const mine = projects.filter((p) => p.ownerId === user!.id);

  return (
    <>
      <PageHeader title="Profile" subtitle="Your account details." />
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

          <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-sm sm:grid-cols-2">
            <Row k="Role" v={user!.role} />
            <Row k="Organization" v={user!.org ?? "—"} />
            <Row k="Projects submitted" v={String(mine.length)} />
            <Row k="Wallet balance" v={`${user!.walletBalance} AQC`} />
          </dl>
        </CardBody>
      </Card>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-500">{k}</dt>
      <dd className="font-medium capitalize text-ink">{v}</dd>
    </div>
  );
}
