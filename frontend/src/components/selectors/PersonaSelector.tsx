type Props = {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
  className?: string; 
};

export function PersonaSelector({ 
  value, 
  onChange, 
  options, 
  className = "" 
}: Props) {
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-zinc-900 border border-zinc-700 
rounded-lg px-3 py-2 text-sm ${className}`}
    >
      {options.map((persona) => (
        <option key={persona.id} value={persona.id}>
          {persona.name}
        </option>
      ))}
    </select>
  );
}