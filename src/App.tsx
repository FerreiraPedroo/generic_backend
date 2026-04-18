import { useState } from "react";

import "./App.css";

import { ConditionRow } from "./modules/condition/condition-row";
import { ConditionModal } from "./shared/ui/ConditionModal";
import { ExpressionModal } from "./shared/ui/ExpressionModal";

import type { Route } from "./shared/components/types/routes.types";
import type { Condition } from "./shared/components/types/condition.types";
import type { Expression } from "./shared/components/types/expression.types";
import { RouteModal } from "./shared/ui/RouteModal";

function App() {
  //////////////////////////////////////////////////////////////////////////////
  // ROUTES ///////////////////////////////////////////////////////////////////
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeSelected, setRouteSelected] = useState(0);
  const [showRoute, setShowRoute] = useState(false);

  function handleRoute() {
    setShowRoute(true);
  }

  function addRoute(route: Route) {
    const newRoute = structuredClone(routes);
    newRoute.push(route);
    setRoutes(newRoute);
  }

  //////////////////////////////////////////////////////////////////////////////
  // CONDITION ////////////////////////////////////////////////////////////////
  const [conditionsList, setConditionsList] = useState<Condition[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [showCondition, setShowCondition] = useState(false);

  function handleCondition(status: boolean) {
    setShowCondition(status);
  }
  function addCondition(condition: Condition) {
    handleCondition(false);
    setSelectedCondition(condition);

    if (condition.params?.length) {
      handleExpression(true);
    } else {
      setConditionsList((cond) => [...cond, { ...condition }]);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  // EXPRESSION ////////////////////////////////////////////////////////////////
  const [showExpression, setShowExpression] = useState(false);

  function addExpression(operator: string, expression: Expression | string) {
    if (selectedCondition) {
      if (typeof expression == "string") {
        console.log("OK");
        setConditionsList((cond) => [...cond, { ...selectedCondition, operator, expressions: expression }]);
        setSelectedCondition(null);
      } else {
        setConditionsList((cond) => [...cond, { ...selectedCondition, operator, expressions: [{ ...expression }] }]);
        setSelectedCondition(null);
      }
    }
  }

  function handleExpression(status: boolean) {
    setShowExpression(status);
  }

  return (
    <div className="w-full max-w-3xl border border-slate-400 bg-slate-200 text-sm font-sans">
      {/* HEADER */}
      <div className="bg-slate-300 px-2 py-1 border-b border-slate-400 flex flex-col items-center">
        <span className="font-semibold">All the events</span>
        <span className="text-slate-600">All the objects</span>
      </div>

      <div>
        {routes.map((route) => (
          <>
            <div>{route.name}</div>
            {conditionsList.map((cond, index) => (
              <ConditionRow
                key={cond.id}
                index={index}
                cond={cond}
                // updateCondition={updateCondition}
                // removeCondition={removeCondition}
              />
            ))}
          </>
        ))}
      </div>

      {routes.length ? (
        <div
          onClick={() => handleCondition(true)}
          className="px-2 py-1 cursor-pointer hover:bg-gray-300 border-t border-gray-300"
        >
          + New condition
        </div>
      ) : (
        <div
          onClick={() => handleRoute()}
          className="px-2 py-1 cursor-pointer hover:bg-gray-300 border-t border-gray-300"
        >
          + New Route
        </div>
      )}

      {showRoute && <RouteModal addRoute={addRoute} setShow={handleRoute} />}
      {showCondition && <ConditionModal addCondition={addCondition} setShow={handleCondition} />}
      {showExpression && (
        <ExpressionModal
          setShow={setShowExpression}
          addExpression={addExpression}
          selectedCondition={selectedCondition}
        />
      )}
    </div>
  );
}

export default App;
