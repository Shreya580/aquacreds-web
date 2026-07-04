"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/status-badge";
import { money, num } from "@/lib/format";
import { useStore } from "@/lib/store";

export default function MarketplacePage() {
  const { projects, buyCredits } = useStore();
  const listed = projects.filter((p) => p.listed && p.credits > 0);
  const [buying, setBuying] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="Carbon credit marketplace"
        subtitle="Buy verified blue-carbon credits (AQC) from restoration projects."
      />

      {listed.length === 0 ? (
        <p className="text-sm text-slate-400">No credits listed right now.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listed.map((p) => (
            <Card key={p.id}>
              <CardBody className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <Badge>{p.ecosystem}</Badge>
                  <span className="text-sm font-semibold text-ocean-700">
                    {money(p.pricePerCredit)}/AQC
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-ink">{p.title}</h3>
                <p className="text-sm text-slate-500">
                  {p.district}, {p.state}
                </p>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                  <span>{num(p.credits)} AQC available</span>
                  <span>{p.area} ha</span>
                </div>

                {buying === p.id ? (
                  <BuyBox
                    max={p.credits}
                    price={p.pricePerCredit}
                    onCancel={() => setBuying(null)}
                    onBuy={(amt) => {
                      buyCredits(p.id, amt);
                      setBuying(null);
                    }}
                  />
                ) : (
                  <Button
                    className="mt-4 w-full"
                    onClick={() => setBuying(p.id)}
                  >
                    Buy credits
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function BuyBox({
  max,
  price,
  onBuy,
  onCancel,
}: {
  max: number;
  price: number;
  onBuy: (amt: number) => void;
  onCancel: () => void;
}) {
  const [amt, setAmt] = useState(10);
  const clamped = Math.max(1, Math.min(max, amt || 1));
  return (
    <div className="mt-4 space-y-3 rounded-xl bg-ocean-50 p-3">
      <input
        type="range"
        min={1}
        max={max}
        value={clamped}
        onChange={(e) => setAmt(+e.target.value)}
        className="w-full accent-ocean-600"
      />
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{clamped} AQC</span>
        <span className="font-semibold text-ink">{money(clamped * price)}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" variant="success" className="flex-1" onClick={() => onBuy(clamped)}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
