type Props = {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
};

export function ModelSelector({ 
  value, 
  onChange, 
  options 
}: Props) {
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-zinc-900 border border-zinc-700 
rounded-lg px-3 py-2 text-sm"
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}