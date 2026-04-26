export function ConditionRow({ condition, conditionIndex, removeCondition, routeId, routeIndex }: any) {
  return (
    <div className="min-h-12 flex items-center border-t bg-slate-100 border-slate-300 px-2 py-1">
      <div className="pl-12 text-gray-600">
        {routeIndex + 1}-{conditionIndex + 1}
      </div>
      <div className="min-w-10 text-center">•</div>

      <div className="flex-1 flex items-center gap-2">
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

      {/* ACTIONS */}
      <button
        onClick={() => removeCondition(routeId, condition.id)}
        className="text-red-600 text-xs ml-2 py-1.5 px-2 hover:cursor-pointer hover:bg-red-100 rounded-3xl"
      >
        ✕
      </button>
    </div>
  );
}
