export const allowedColors = ["brand", "ink", "earth", "muted"] as const;
export type AllowedColor = typeof allowedColors[number];

export function isAllowedColor(value: unknown): value is AllowedColor {
  return typeof value === "string" && allowedColors.includes(value as AllowedColor);
}

export function normalizeColor(value: unknown): AllowedColor {
  if (Array.isArray(value)) value = value[0];
  if (typeof value !== "string") return "ink";

  const v = value.toLowerCase();
  return isAllowedColor(v) ? v : "ink";
}