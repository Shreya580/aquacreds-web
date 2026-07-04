// Tiny className joiner — filters out falsy values. Avoids a clsx dependency.
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
