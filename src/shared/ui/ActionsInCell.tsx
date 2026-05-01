export function ActionsInCell({ actions }) {
  return (
    <div className="min-h-6 rounded-md m-1">
      {actions.map((action, index: number) => (
        <div key={index} className="p-1 bg-white text-sm">
          ● {action.name}
        </div>
      ))}
    </div>
  );
}
