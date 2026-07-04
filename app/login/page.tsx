"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormRow, Input } from "@/components/ui/field";
import { useStore } from "@/lib/store";

const demos = [
  { role: "User", email: "user@aqua.dev", desc: "Submit projects, trade credits" },
  { role: "Verifier", email: "verifier@aqua.dev", desc: "Review the pending queue" },
  { role: "Admin", email: "admin@aqua.dev", desc: "Approve & issue credits" },
];

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function go(withEmail: string) {
    const u = login(withEmail);
    if (!u) {
      setError("No account with that email. Try a demo account below.");
      return;
    }
    router.push(`/${u.role}`);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left brand panel */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-ocean-700 to-ocean-900 p-12 text-white lg:flex">
        <Link href="/" className="text-lg font-bold">
          🌊 AquaCreds
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-snug">
            Verifiable blue-carbon credits, end to end.
          </h2>
          <p className="mt-4 max-w-sm text-ocean-100">
            Log in to submit restoration projects, review submissions, or manage
            the registry.
          </p>
        </div>
        <p className="text-sm text-ocean-200">Demo build · mock data</p>
      </div>

      {/* right form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 block text-lg font-bold text-ocean-700 lg:hidden">
            🌊 AquaCreds
          </Link>
          <h1 className="text-2xl font-bold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">
            Log in to your AquaCreds account.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              go(email);
            }}
          >
            <FormRow label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormRow>
            <FormRow label="Password" htmlFor="pw">
              <Input id="pw" type="password" placeholder="••••••••" />
            </FormRow>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" /> or try a demo account
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-2">
            {demos.map((d) => (
              <button
                key={d.email}
                onClick={() => go(d.email)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-ocean-300 hover:bg-ocean-50"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{d.role}</p>
                  <p className="text-xs text-slate-500">{d.desc}</p>
                </div>
                <span className="text-ocean-600">→</span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            No account?{" "}
            <Link href="/signup" className="font-medium text-ocean-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
