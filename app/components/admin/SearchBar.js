import Input from "@/app/components/ui/Input";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="my-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "بحث..."}
      />
    </div>
  );
}
