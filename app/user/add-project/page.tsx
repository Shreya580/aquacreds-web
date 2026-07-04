"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { FormRow, Input, Select } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";

const STEPS = ["Organization", "Plantation", "Geotag", "Review"];

// the editable shape (all strings from inputs)
type Draft = {
  orgName: string;
  regNo: string;
  year: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  title: string;
  ecosystem: "Mangrove" | "Seagrass" | "Salt marsh";
  plantationDate: string;
  area: string;
  species: string;
  saplings: string;
  seedSource: string;
  latitude: string;
  longitude: string;
};

const empty: Draft = {
  orgName: "", regNo: "", year: "", fullName: "", email: "", mobile: "",
  designation: "", address: "", state: "", district: "", pincode: "",
  title: "", ecosystem: "Mangrove", plantationDate: "", area: "", species: "",
  saplings: "", seedSource: "", latitude: "", longitude: "",
};

export default function AddProjectPage() {
  const { addProject } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>(empty);

  const set = (k: keyof Draft) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setD((p) => ({ ...p, [k]: e.target.value }));

  function submit() {
    addProject({
      ...d,
      latitude: d.latitude ? parseFloat(d.latitude) : undefined,
      longitude: d.longitude ? parseFloat(d.longitude) : undefined,
    });
    router.push("/user?created=1");
  }

  return (
    <>
      <PageHeader
        title="New restoration project"
        subtitle="Submit plantation data for verification."
      />

      {/* stepper */}
      <div className="mb-6 flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  i < step && "bg-ocean-600 text-white",
                  i === step && "bg-ocean-600 text-white ring-4 ring-ocean-100",
                  i > step && "bg-slate-200 text-slate-500"
                )}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  i <= step ? "text-ink" : "text-slate-400"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-px flex-1",
                  i < step ? "bg-ocean-500" : "bg-slate-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardBody className="p-6">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Organization name">
                <Input value={d.orgName} onChange={set("orgName")} />
              </FormRow>
              <FormRow label="Registration no.">
                <Input value={d.regNo} onChange={set("regNo")} />
              </FormRow>
              <FormRow label="Established year">
                <Input value={d.year} onChange={set("year")} placeholder="2021" />
              </FormRow>
              <FormRow label="Contact person">
                <Input value={d.fullName} onChange={set("fullName")} />
              </FormRow>
              <FormRow label="Email">
                <Input type="email" value={d.email} onChange={set("email")} />
              </FormRow>
              <FormRow label="Mobile">
                <Input value={d.mobile} onChange={set("mobile")} />
              </FormRow>
              <FormRow label="Designation">
                <Input value={d.designation} onChange={set("designation")} />
              </FormRow>
              <FormRow label="Address">
                <Input value={d.address} onChange={set("address")} />
              </FormRow>
              <FormRow label="State">
                <Input value={d.state} onChange={set("state")} />
              </FormRow>
              <FormRow label="District">
                <Input value={d.district} onChange={set("district")} />
              </FormRow>
              <FormRow label="Pincode">
                <Input value={d.pincode} onChange={set("pincode")} />
              </FormRow>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Project title">
                <Input value={d.title} onChange={set("title")} />
              </FormRow>
              <FormRow label="Ecosystem">
                <Select value={d.ecosystem} onChange={set("ecosystem")}>
                  <option>Mangrove</option>
                  <option>Seagrass</option>
                  <option>Salt marsh</option>
                </Select>
              </FormRow>
              <FormRow label="Plantation date">
                <Input type="date" value={d.plantationDate} onChange={set("plantationDate")} />
              </FormRow>
              <FormRow label="Area (hectares)">
                <Input value={d.area} onChange={set("area")} />
              </FormRow>
              <FormRow label="Species">
                <Input value={d.species} onChange={set("species")} />
              </FormRow>
              <FormRow label="No. of saplings">
                <Input value={d.saplings} onChange={set("saplings")} />
              </FormRow>
              <FormRow label="Seed source">
                <Input value={d.seedSource} onChange={set("seedSource")} />
              </FormRow>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormRow label="Latitude">
                  <Input value={d.latitude} onChange={set("latitude")} placeholder="10.05" />
                </FormRow>
                <FormRow label="Longitude">
                  <Input value={d.longitude} onChange={set("longitude")} placeholder="76.18" />
                </FormRow>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-ocean-200 bg-ocean-50/40 p-10 text-center">
                <p className="text-3xl">📷</p>
                <p className="mt-2 text-sm font-medium text-ink">
                  Upload geotagged photo
                </p>
                <p className="text-xs text-slate-500">
                  (Demo — file upload wired to backend later)
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Review before submitting. Once submitted it goes to the verifier
                queue.
              </p>
              <div className="grid gap-x-6 gap-y-2 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
                <Review k="Organization" v={d.orgName} />
                <Review k="Contact" v={d.fullName} />
                <Review k="Title" v={d.title} />
                <Review k="Ecosystem" v={d.ecosystem} />
                <Review k="Area" v={d.area ? `${d.area} ha` : "—"} />
                <Review k="Species" v={d.species} />
                <Review k="Saplings" v={d.saplings} />
                <Review k="Location" v={`${d.district}, ${d.state}`} />
                <Review k="Coordinates" v={d.latitude ? `${d.latitude}, ${d.longitude}` : "—"} />
              </div>
            </div>
          )}

          {/* nav */}
          <div className="mt-6 flex justify-between border-t border-slate-100 pt-5">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Next →</Button>
            ) : (
              <Button variant="success" onClick={submit}>
                ✓ Submit project
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

function Review({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200/70 py-1.5">
      <span className="text-slate-500">{k}</span>
      <span className="text-right font-medium text-ink">{v || "—"}</span>
    </div>
  );
}
