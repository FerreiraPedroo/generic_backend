import { useState } from "react";
import { databaseConditions } from "./database-conditions";
import { databaseExpressions } from "./database-expressions";
import { icons } from "../../../../assets/img";

export function DatabaseObject({ addItem, type }: { addItem: any; type: string }) {
  const [open, setOpen] = useState(false);

  const [object, setObject] = useState({
    id: 1,
    name: "DATABASE",
    icon: icons.database,
    conditions: databaseConditions,
    expressions: databaseExpressions,
  });

  return (
    <div className="w-20 relative">
      {/* SELECT */}
      <div
        onClick={() => setOpen(!open)}
        className="h-14 border flex justify-center items-center bg-gray-400 cursor-pointer"
      >
        {object.name}
      </div>

      {/* MENU */}
      {open && (
        <div className="absolute top-6 z-10 bg-white border border-gray-400 shadow">
          {object.conditions.map((condition: any) => (
            <div
              key={condition.name}
              // onClick={onSetParam()}
              className="w-30 px-2 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-xs"
            >
              <img src={condition.database} />
              {condition.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
