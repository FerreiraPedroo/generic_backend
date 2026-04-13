import { Dropdown } from "../../shared/components/Dropdown";

export function ConditionRow({ cond, index, updateCondition, removeCondition }: any) {
  return (
    <div className="flex items-center border-t border-gray-300 hover:bg-gray-300 px-2 py-1">
      {/* INDEX */}
      <div className="w-6 text-gray-600">{index + 1}</div>

      {/* BULLET */}
      <div className="w-4">•</div>

      {/* TEXT */}
      <div className="flex-1 flex items-center gap-2">
        <Dropdown
          value={cond.field}
          options={["Space bar", "Mouse click", "Timer"]}
          onChange={(v) => updateCondition(cond.id, { field: v })}
        />

        <Dropdown
          value={cond.operator}
          options={["pressed", "released", "equals", "contains"]}
          onChange={(v) => updateCondition(cond.id, { operator: v })}
        />

        {cond.operator !== "pressed" && (
          <input
            value={cond.value}
            onChange={(e) => updateCondition(cond.id, { value: e.target.value })}
            className="border border-gray-400 px-1 bg-white h-5 text-xs"
          />
        )}
      </div>

      {/* ACTIONS */}
      <button onClick={() => removeCondition(cond.id)} className="text-red-600 text-xs ml-2">
        ✕
      </button>
    </div>
  );
}
