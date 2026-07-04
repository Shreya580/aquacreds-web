"use client";

import { PageHeader } from "@/components/shell";
import { Card, CardBody } from "@/components/ui/card";
import { date, money, num } from "@/lib/format";
import { useStore } from "@/lib/store";
import { CreditTx } from "@/lib/types";

const txMeta: Record<CreditTx["type"], { label: string; cls: string; sign: string }> = {
  issued: { label: "Issued", cls: "text-emerald-700", sign: "+" },
  buy: { label: "Bought", cls: "text-emerald-700", sign: "+" },
  sell: { label: "Sold", cls: "text-rose-600", sign: "−" },
};

export default function WalletPage() {
  const { user, txs } = useStore();

  return (
    <>
      <PageHeader title="Wallet" subtitle="Your carbon-credit balance & activity." />

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-ocean-600 to-ocean-800 p-6 text-white">
          <p className="text-sm text-ocean-100">Available balance</p>
          <p className="mt-1 text-4xl font-bold">
            {num(user!.walletBalance)}{" "}
            <span className="text-lg font-medium text-ocean-100">AQC</span>
          </p>
          <p className="mt-4 break-all font-mono text-xs text-ocean-200">
            0x7A9f…{user!.id}E3b · Sepolia testnet
          </p>
        </div>
      </Card>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-ink">Transactions</h2>
      <Card>
        <ul className="divide-y divide-slate-100">
          {txs.length === 0 && (
            <li className="p-5 text-center text-sm text-slate-400">
              No transactions yet.
            </li>
          )}
          {txs.map((t) => {
            const m = txMeta[t.type];
            return (
              <li key={t.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-ink">{t.projectTitle}</p>
                  <p className="text-xs text-slate-500">
                    {m.label} · {date(t.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${m.cls}`}>
                    {m.sign}
                    {num(t.amount)} AQC
                  </p>
                  {t.value > 0 && (
                    <p className="text-xs text-slate-400">{money(t.value)}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}
