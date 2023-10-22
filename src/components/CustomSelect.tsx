import { useEffect, useState } from "react";

type Props = {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  value: string;
  setValue: (value: string) => void;
};

const CustomSelect = ({ label, id, options, value, setValue }: Props) => {
  const [active, setActive] = useState(false);

  const handleSelect = (value: string) => {
    setValue(value);
    setActive(false);
  };

  // close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`#${id}`)) setActive(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [id]);

  return (
    <div className="flex flex-col gap-1 p-4">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div id={id} className="relative">
        <button
          type="button"
          className="input"
          onClick={() => setActive(!active)}
        >
          {options.find((option) => option.value === value)?.label}
        </button>
        <div
          className={`absolute left-0 top-full flex w-full translate-y-2 flex-col overflow-hidden rounded-md bg-white shadow-md transition-all duration-300 ${
            active ? "h-auto" : "h-0"
          }`}
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className="px-4 py-2 text-left text-black hover:bg-gray-200"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
