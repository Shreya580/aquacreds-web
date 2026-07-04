"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";

type NavItem = { href: string; label: string; icon: string };

const NAV: Record<Role, NavItem[]> = {
  user: [
    { href: "/user", label: "Dashboard", icon: "🏠" },
    { href: "/user/add-project", label: "New Project", icon: "➕" },
    { href: "/user/marketplace", label: "Marketplace", icon: "🛒" },
    { href: "/user/wallet", label: "Wallet", icon: "👛" },
    { href: "/user/profile", label: "Profile", icon: "👤" },
  ],
  verifier: [
    { href: "/verifier", label: "Pending Queue", icon: "🕵️" },
    { href: "/verifier/reviewed", label: "Reviewed", icon: "✅" },
    { href: "/verifier/profile", label: "Profile", icon: "👤" },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: "📊" },
    { href: "/admin/projects", label: "Projects", icon: "🌿" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/verifiers", label: "Verifiers", icon: "🛡️" },
  ],
};

export function Shell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user, ready, logout } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  // auth guard — redirect if not logged in or wrong role
  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login");
    else if (user.role !== role) router.replace(`/${user.role}`);
  }, [ready, user, role, router]);

  if (!ready || !user || user.role !== role) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-400">
        Loading…
      </div>
    );
  }

  const nav = NAV[role];

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 px-6 text-lg font-bold text-ocean-700">
          🌊 AquaCreds
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== `/${role}` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-ocean-50 text-ocean-800"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <div className="mb-2 px-2">
            <p className="truncate text-sm font-medium text-ink">{user.name}</p>
            <p className="truncate text-xs capitalize text-slate-400">
              {user.role}
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50"
          >
            ↩ Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        {/* mobile top bar */}
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
          <span className="font-bold text-ocean-700">🌊 AquaCreds</span>
          <button
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="text-sm text-slate-500"
          >
            Log out
          </button>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
