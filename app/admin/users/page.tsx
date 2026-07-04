"use client";

import { PageHeader } from "@/components/shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/status-badge";
import { num } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function AdminUsers() {
  const { users, projects } = useStore();

  return (
    <>
      <PageHeader title="Users" subtitle="Everyone registered on the platform." />
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Projects</th>
              <th className="px-4 py-3 font-medium">Wallet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium text-ink">{u.name}</td>
                <td className="px-4 py-3 text-slate-500">{u.email}</td>
                <td className="px-4 py-3">
                  <Badge className="capitalize">{u.role}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {projects.filter((p) => p.ownerId === u.id).length}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {num(u.walletBalance)} AQC
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
