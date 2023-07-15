export function toRGBAString(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (hex.length === 9) {
    const a = parseInt(hex.slice(7, 9), 16) / 255;
    return `${r}, ${g}, ${b}, ${a}`;
  }

  return `${r}, ${g}, ${b}`;
}
