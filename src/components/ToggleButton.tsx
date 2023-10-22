import { useState } from 'react';

import { cn } from '../lib/tailwind-utils';

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={cn(
              `h-5 w-14 rounded-full shadow-inner transition`,
              isChecked ? "bg-primary" : "bg-dark-800",
            )}
          ></div>
          <div
            className={cn(
              "absolute -top-1 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-white transition",
              isChecked ? "translate-x-7 transform" : "translate-x-0 transform",
            )}
          >
            <span
              className={cn(
                `active h-4 w-4 rounded-full border-2 transition`,
                isChecked
                  ? "border-primary bg-primary"
                  : "border-dark-800 bg-dark-800",
              )}
            ></span>
          </div>
        </div>
      </label>
    </>
  );
};

export default ToggleButton;
