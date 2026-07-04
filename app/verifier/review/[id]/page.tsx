"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectDetail } from "@/components/project-detail";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Textarea } from "@/components/ui/field";
import { useStore } from "@/lib/store";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, setStatus } = useStore();
  const router = useRouter();
  const [comment, setComment] = useState("");

  const project = projects.find((p) => p.id === id);
  if (!project) return <p className="text-slate-400">Project not found.</p>;

  const canAct = project.status === "pending";

  function decide(status: "verified" | "verifier-rejected") {
    setStatus(project!.id, status, comment || undefined);
    router.push("/verifier");
  }

  return (
    <>
      <Link href="/verifier" className="mb-4 inline-block text-sm text-ocean-700">
        ← Back to queue
      </Link>

      <ProjectDetail project={project} />

      {canAct ? (
        <Card className="mt-6">
          <CardBody className="space-y-3">
            <h3 className="font-semibold text-ink">Verifier decision</h3>
            <Textarea
              placeholder="Add a comment (satellite match, canopy health, concerns…)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-3">
              <Button variant="success" onClick={() => decide("verified")}>
                ✓ Verify & pass to admin
              </Button>
              <Button variant="danger" onClick={() => decide("verifier-rejected")}>
                ✕ Reject
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="mt-6">
          <CardBody className="text-sm text-slate-500">
            This project has already been reviewed. Current status is shown above.
          </CardBody>
        </Card>
      )}
    </>
  );
}
