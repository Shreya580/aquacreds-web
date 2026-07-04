import { Shell } from "@/components/shell";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell role="user">{children}</Shell>;
}
