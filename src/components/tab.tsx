interface TabItem {
  label: string;
  key: string;
}

interface TabsProps {
  activeKey: string;
  onChange: (key: string) => void;
  items: TabItem[];
}

export function Tabs({ activeKey, onChange, items }: TabsProps) {
  return (
    <div className="flex border-b">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`px-4 py-2 -mb-px ${
            item.key === activeKey
              ? "border-b-2 border-blue-500 font-medium text-blue-600"
              : "text-gray-500"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
