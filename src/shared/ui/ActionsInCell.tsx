export function ActionsInCell({ actions }) {
  return (
    <div className="min-h-8 p-2 border-slate-400 bg-slate-100 rounded-sm">
      {actions.map((action, index: number) => (
        <div key={index} className="p-1 bg-white text-sm">
          {action.name}
        </div>
      ))}
    </div>
  );
}
