import { useState } from "react";

export function Dropdown({ value, conditions, onSetParam }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* SELECT */}
      <div
        onClick={() => setOpen(!open)}
        className=" h-14 border flex justify-center items-center bg-gray-400 cursor-pointer"
      >
        {value || "Select"}
      </div>

      {/* MENU */}
      {open && (
        <div className="absolute top-6 z-10 bg-white border border-gray-400 shadow">
          {conditions.map((condition: any) => (
            <div
              key={condition.name}
              onClick={onSetParam()}
              className="w-30 px-2 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-xs"
            >
              {condition.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
