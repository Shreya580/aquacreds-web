"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormRow, Input, Select } from "@/components/ui/field";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";

export default function SignupPage() {
  const { register } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("user");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-ocean-700 to-ocean-900 p-12 text-white lg:flex">
        <Link href="/" className="text-lg font-bold">
          🌊 AquaCreds
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-snug">
            Join the blue-carbon registry.
          </h2>
          <p className="mt-4 max-w-sm text-ocean-100">
            Create an account to start submitting and tracking restoration
            projects.
          </p>
        </div>
        <p className="text-sm text-ocean-200">Demo build · mock data</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-ink">Create account</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pick a role to explore that side of the app.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const u = register(name || "New User", email || `${role}+${Date.now()}@aqua.dev`, role);
              router.push(`/${u.role}`);
            }}
          >
            <FormRow label="Full name" htmlFor="name">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Asha Menon"
              />
            </FormRow>
            <FormRow label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </FormRow>
            <FormRow label="I am a…" htmlFor="role">
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="user">Project owner (user)</option>
                <option value="verifier">Verifier</option>
                <option value="admin">Admin</option>
              </Select>
            </FormRow>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-ocean-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
