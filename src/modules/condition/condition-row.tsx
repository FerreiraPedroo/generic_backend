export function ConditionRow({ cond, index }: any) {
  return (
    <div className="flex items-center border-t bg-slate-100 border-slate-300  px-2 py-1">
      <div className="px-3 text-gray-600">{index + 1}</div>
      <div className="min-w-8 text-center">•</div>

      <div className="flex-1 flex items-center gap-2">
        <div className="flex gap-2 justify-center items-center select-none pr-2">
          <img src={cond.icon} className="w-8 h-8 border border-gray-400 bg-gray-300" />
          <span>{cond.name}</span>
        </div>

        {cond.params &&
          (typeof cond.expressions == "string" ? (
            <>
              <div className="rounded-xl bg-blue-300 px-4 py-0 select-none font-medium">{cond.operator}</div>
              <span className="px-4 text-lg">{cond.expressions}</span>
            </>
          ) : (
            <>
              <div className="flex justify-center rounded-xl items-center bg-blue-300 px-4 py-1 select-none ">
                {cond.operator}
              </div>
              {cond.expressions?.map((exp) => (
                <div className="flex gap-2 justify-center items-center px-2 py-1 select-none ">
                  <img src={exp.icon} className="w-8 h-8 border border-gray-400 bg-gray-300" />
                  <span>{exp.menuName}</span>
                </div>
              ))}
            </>
          ))}
      </div>

      {/* ACTIONS */}
      <button
        onClick={() => null /*removeCondition(cond.id)*/}
        className="text-red-600 text-xs ml-2 py-1.5 px-2 hover:cursor-pointer hover:bg-red-100 rounded-3xl"
      >
        ✕
      </button>
    </div>
  );
}
