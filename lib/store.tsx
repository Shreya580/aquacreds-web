"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SEED_PROJECTS, SEED_TX, SEED_USERS } from "./mock-data";
import { CreditTx, Project, ProjectStatus, Role, User } from "./types";

type NewProject = Omit<
  Project,
  "id" | "ownerId" | "status" | "listed" | "credits" | "pricePerCredit" | "createdAt"
>;

type Store = {
  ready: boolean;
  user: User | null;
  users: User[];
  projects: Project[];
  txs: CreditTx[];

  login: (email: string) => User | null;
  register: (name: string, email: string, role: Role) => User;
  logout: () => void;

  addProject: (data: NewProject) => Project;
  setStatus: (id: string, status: ProjectStatus, comment?: string) => void;
  issueCredits: (id: string, credits: number, price: number) => void;
  buyCredits: (projectId: string, amount: number) => void;
};

const StoreCtx = createContext<Store | null>(null);
const LS_KEY = "aquacreds-state-v1";

type Persisted = {
  userId: string | null;
  users: User[];
  projects: Project[];
  txs: CreditTx[];
};

function load(): Persisted {
  if (typeof window !== "undefined") {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as Persisted;
      } catch {
        /* fall through to seed */
      }
    }
  }
  return { userId: null, users: SEED_USERS, projects: SEED_PROJECTS, txs: SEED_TX };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [txs, setTxs] = useState<CreditTx[]>(SEED_TX);

  // hydrate from localStorage on mount
  useEffect(() => {
    const s = load();
    setUserId(s.userId);
    setUsers(s.users);
    setProjects(s.projects);
    setTxs(s.txs);
    setReady(true);
  }, []);

  // persist on change
  useEffect(() => {
    if (!ready) return;
    const data: Persisted = { userId, users, projects, txs };
    window.localStorage.setItem(LS_KEY, JSON.stringify(data));
  }, [ready, userId, users, projects, txs]);

  const user = useMemo(
    () => users.find((u) => u.id === userId) ?? null,
    [users, userId]
  );

  const store: Store = {
    ready,
    user,
    users,
    projects,
    txs,

    login: (email) => {
      const found = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (found) setUserId(found.id);
      return found ?? null;
    },
    register: (name, email, role) => {
      const existing = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (existing) {
        setUserId(existing.id);
        return existing;
      }
      const u: User = {
        id: "u" + Math.random().toString(36).slice(2, 8),
        name,
        email: email.trim(),
        role,
        walletBalance: 0,
      };
      setUsers((prev) => [...prev, u]);
      setUserId(u.id);
      return u;
    },

    logout: () => setUserId(null),

    addProject: (data) => {
      const p: Project = {
        ...data,
        id: "p" + Math.random().toString(36).slice(2, 8),
        ownerId: userId ?? "u1",
        status: "pending",
        listed: false,
        credits: 0,
        pricePerCredit: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setProjects((prev) => [p, ...prev]);
      return p;
    },

    setStatus: (id, status, comment) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status,
                ...(status.startsWith("verifier") || status === "verified"
                  ? { verifierComment: comment ?? p.verifierComment }
                  : { adminComment: comment ?? p.adminComment }),
              }
            : p
        )
      );
    },

    issueCredits: (id, credits, price) => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, status: "issued", listed: true, credits, pricePerCredit: price }
            : p
        )
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.id === (projects.find((p) => p.id === id)?.ownerId ?? "")
            ? { ...u, walletBalance: u.walletBalance + credits }
            : u
        )
      );
      const proj = projects.find((p) => p.id === id);
      if (proj) {
        setTxs((prev) => [
          {
            id: "t" + Math.random().toString(36).slice(2, 7),
            type: "issued",
            projectTitle: proj.title,
            amount: credits,
            value: 0,
            date: new Date().toISOString().slice(0, 10),
          },
          ...prev,
        ]);
      }
    },

    buyCredits: (projectId, amount) => {
      const proj = projects.find((p) => p.id === projectId);
      if (!proj || !user) return;
      const value = amount * proj.pricePerCredit;
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, walletBalance: u.walletBalance + amount } : u
        )
      );
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, credits: Math.max(0, p.credits - amount) } : p
        )
      );
      setTxs((prev) => [
        {
          id: "t" + Math.random().toString(36).slice(2, 7),
          type: "buy",
          projectTitle: proj.title,
          amount,
          value,
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    },
  };

  return <StoreCtx.Provider value={store}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
