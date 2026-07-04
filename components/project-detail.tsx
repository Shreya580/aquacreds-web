import { Card, CardBody } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { date, num } from "@/lib/format";
import { Project } from "@/lib/types";

export function ProjectDetail({ project: p }: { project: Project }) {
  const fields: [string, string][] = [
    ["Ecosystem", p.ecosystem],
    ["Area", `${p.area} ha`],
    ["Species", p.species],
    ["Saplings", num(+p.saplings || 0)],
    ["Seed source", p.seedSource],
    ["Plantation date", p.plantationDate ? date(p.plantationDate) : "—"],
    ["Location", `${p.district}, ${p.state}`],
    ["Coordinates", p.latitude ? `${p.latitude}, ${p.longitude}` : "—"],
    ["Organization", p.orgName],
    ["Reg. no.", p.regNo],
    ["Contact", `${p.fullName} · ${p.mobile}`],
    ["Submitted", date(p.createdAt)],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5">
            <div>
              <h2 className="text-xl font-semibold text-ink">{p.title}</h2>
              <p className="text-sm text-slate-500">
                {p.district}, {p.state}
              </p>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <CardBody>
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {fields.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-slate-100 py-1.5">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </CardBody>
        </Card>

        {(p.verifierComment || p.adminComment) && (
          <Card>
            <CardBody className="space-y-3">
              <h3 className="font-semibold text-ink">Review notes</h3>
              {p.verifierComment && (
                <p className="rounded-lg bg-sky-50 p-3 text-sm text-sky-900">
                  <b>Verifier:</b> {p.verifierComment}
                </p>
              )}
              {p.adminComment && (
                <p className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">
                  <b>Admin:</b> {p.adminComment}
                </p>
              )}
            </CardBody>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardBody>
            <h3 className="mb-3 font-semibold text-ink">Progress</h3>
            <Timeline status={p.status} />
          </CardBody>
        </Card>

        {p.credits > 0 && (
          <Card>
            <CardBody>
              <p className="text-sm text-slate-500">Credits issued</p>
              <p className="text-2xl font-bold text-emerald-700">
                {num(p.credits)} AQC
              </p>
            </CardBody>
          </Card>
        )}

        <div className="grid h-40 place-items-center rounded-2xl border border-ocean-100 bg-ocean-50 text-sm text-ocean-700">
          🗺️ Map preview ({p.latitude ?? "—"}, {p.longitude ?? "—"})
        </div>
      </div>
    </div>
  );
}

const FLOW = ["Submitted", "Verified", "Approved", "Issued"] as const;

function stageIndex(status: Project["status"]) {
  if (status === "issued") return 3;
  if (status === "approved") return 2;
  if (status === "verified") return 1;
  if (status.includes("rejected")) return -1;
  return 0;
}

function Timeline({ status }: { status: Project["status"] }) {
  const idx = stageIndex(status);
  const rejected = status.includes("rejected");
  return (
    <ol className="space-y-3">
      {FLOW.map((label, i) => {
        const done = i <= idx;
        return (
          <li key={label} className="flex items-center gap-3">
            <span
              className={
                "grid h-6 w-6 place-items-center rounded-full text-xs " +
                (done ? "bg-ocean-600 text-white" : "bg-slate-200 text-slate-400")
              }
            >
              {done ? "✓" : i + 1}
            </span>
            <span className={done ? "text-sm text-ink" : "text-sm text-slate-400"}>
              {label}
            </span>
          </li>
        );
      })}
      {rejected && (
        <li className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-500 text-xs text-white">
            ✕
          </span>
          <span className="text-sm font-medium text-rose-600">Rejected</span>
        </li>
      )}
    </ol>
  );
}
