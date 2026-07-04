"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectDetail } from "@/components/project-detail";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { FormRow, Input, Textarea } from "@/components/ui/field";
import { useStore } from "@/lib/store";

export default function AdminProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, setStatus, issueCredits } = useStore();
  const router = useRouter();
  const project = projects.find((p) => p.id === id);

  // suggest credits from area (rough demo heuristic)
  const suggested = project ? Math.round((+project.area || 0) * 18) : 0;
  const [credits, setCredits] = useState(String(suggested));
  const [price, setPrice] = useState("10");
  const [comment, setComment] = useState("");

  if (!project) return <p className="text-slate-400">Project not found.</p>;

  const canAct = project.status === "verified";

  return (
    <>
      <Link href="/admin/projects" className="mb-4 inline-block text-sm text-ocean-700">
        ← Back to projects
      </Link>

      <ProjectDetail project={project} />

      {canAct ? (
        <Card className="mt-6">
          <CardBody className="space-y-4">
            <h3 className="font-semibold text-ink">Admin decision</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormRow label="Credits to issue (AQC)">
                <Input
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                />
              </FormRow>
              <FormRow label="Marketplace price (USD/AQC)">
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormRow>
            </div>
            <Textarea
              placeholder="Approval / rejection note"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                variant="success"
                onClick={() => {
                  setStatus(project.id, "approved", comment || undefined);
                  issueCredits(project.id, +credits || 0, +price || 0);
                  router.push("/admin/projects");
                }}
              >
                ✓ Approve & issue credits
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setStatus(project.id, "admin-rejected", comment || undefined);
                  router.push("/admin/projects");
                }}
              >
                ✕ Reject
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="mt-6">
          <CardBody className="text-sm text-slate-500">
            {project.status === "pending"
              ? "Still awaiting verifier review."
              : "No admin action pending for this project."}
          </CardBody>
        </Card>
      )}
    </>
  );
}
