import "./Tag.css";

export default function Tag({ children }: { children: string }) {
  return <span className="tag">{children}</span>;
}

export function TagRow({ items }: { items: string[] }) {
  return (
    <div className="tag-row">
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}
