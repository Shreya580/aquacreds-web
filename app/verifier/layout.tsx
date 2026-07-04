import { Shell } from "@/components/shell";

export default function VerifierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell role="verifier">{children}</Shell>;
}
