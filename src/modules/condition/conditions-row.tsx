import { useState } from "react";
import type { Condition, ConditionGroup } from "../../shared/components/types/condition.types";

type ConditionsRow = {
  routeUrl: string;
  routeIndex: number;
  conditionGroup: ConditionGroup;
  conditionsGroupIndex: number;
  removeCondition: (routeUrl: string, conditionsIndex: number, conditionId: number) => void;
  conditionModal: (routeUrl: string, conditionIndex: number | null) => void;
  negateCondition: (routeIndex: number, conditionsGroupIndex: number, conditionIndex: number) => void;
};

export function ConditionsRow({
  routeUrl,
  routeIndex,
  conditionGroup,
  conditionsGroupIndex,
  removeCondition,
  conditionModal,
  negateCondition,
}: ConditionsRow) {
  const [showDropList, setShowDropList] = useState<{ x: string; y: string; conditionIndex: number } | null>(null);

  function dropListPosition(event: React.MouseEvent<HTMLDivElement>, conditionIndex: number) {
    setShowDropList({ x: `top-[-10px]`, y: `left-[40%]`, conditionIndex });
  }
  function handleNegateCondition() {
    if (showDropList) {
      negateCondition(routeIndex, conditionsGroupIndex, showDropList.conditionIndex);
      setShowDropList(null);
    }
  }
  function handleNewCondition() {
    conditionModal(routeUrl, conditionsGroupIndex);
    setShowDropList(null);
  }

  return (
    <>
      <div
        className="flex flex-col border-b bg-slate-100 border-b-slate-400 action:bg-red-400 select-none py-2"
        onMouseLeave={() => setShowDropList(null)}
      >
        {conditionGroup.conditions.map((condition: Condition, index: number) => (
          <div
            key={`${condition.id}-${index} `}
            className={`min-h-10 max-h-10 flex items-center px-2 select-none  ${index == showDropList?.conditionIndex ? "bg-yellow-200" : "hover:bg-slate-200"}`}
            onAuxClick={(e) => dropListPosition(e, index)}
          >
            <div className="pl-8 text-gray-600">
              {routeIndex + 1}.{conditionsGroupIndex + 1}.{index + 1}
            </div>
            <div className="min-w-8 text-center">•</div>

            <div className="flex-1 flex items-center gap-2">
              {condition.not && (
                <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg ">
                  <span>(not)</span>
                </div>
              )}

              <div className="flex gap-2 justify-center items-center select-none pr-2">
                <img src={condition.icon} className="w-8 h-8 border border-gray-400 bg-gray-300" />
                <span>{condition.name}</span>
              </div>

              {condition.params &&
                (typeof condition.expressions == "string" ? (
                  <>
                    <div className="flex min-w-22 justify-center rounded-xl items-center bg-blue-300 px-4 py-1 select-none ">
                      {condition.operator}
                    </div>
                    <span className="px-4 text-lg">{condition.expressions}</span>
                  </>
                ) : (
                  <>
                    <div className="flex min-w-22 justify-center rounded-xl items-center bg-blue-300 px-4 py-1 select-none ">
                      {condition.operator}
                    </div>
                    {condition.expressions?.map((exp, index) => (
                      <div key={index} className="flex gap-2 justify-center items-center px-2 py-1 select-none ">
                        <img src={exp.icon} className="w-8 h-8 border border-gray-400 bg-gray-300" />
                        <span>{exp.menuName}</span>
                      </div>
                    ))}
                  </>
                ))}
            </div>

            {/* REMOVE CONDITION */}
            <button
              onClick={() => removeCondition(routeUrl, conditionsIndex, condition.id)}
              className="text-red-600 text-xs ml-2 py-1.5 px-2 hover:cursor-pointer hover:bg-red-100 rounded-3xl"
            >
              ✕
            </button>
          </div>
        ))}
        {showDropList && (
          <div className={`min-w-40 relative`}>
            <div
              className={`min-w-40 absolute z-10 bg-yellow-200 border border-gray-500 shadow p-1 rounded-md -top-2.5 left-[40%]`}
            >
              <div
                onClick={handleNegateCondition}
                className="min-w-40 px-2 py-1 hover:bg-blue-600 hover:text-white hover:border-blue-300 cursor-pointer text-sm rounded-sm"
              >
                ≠ Negate condition
              </div>
              <div
                onClick={handleNewCondition}
                className="min-w-40 px-2 py-1 hover:bg-blue-600 hover:text-white hover:border-blue-300 cursor-pointer text-sm rounded-sm"
              >
                + Add condtion
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
