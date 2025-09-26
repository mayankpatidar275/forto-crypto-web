import React from "react";

type DropdownSelectProps = {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4 w-48">
      <label className="mb-1 font-semibold text-gray-700">{label}</label>
      <select
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
