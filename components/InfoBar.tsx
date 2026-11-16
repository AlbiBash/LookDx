export function InfoBar({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="wrap">
      <div className="info-bar small">
        {items.map((it, i) => (
          <span key={i}>{it}</span>
        ))}
      </div>
    </div>
  );
}
