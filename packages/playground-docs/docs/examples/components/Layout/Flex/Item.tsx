export function Item(props: any) {
  return (
    <div
      style={{
        borderRadius: 4,
        background: "rgba(var(--color-primary), 0.05)",
        border: "1px solid rgba(var(--color-primary), 0.35)",
        ...props.style,
        height: 50,
        width: 50,
      }}
    />
  );
}
