import { useState } from "react";

import "./App.css";

import { ConditionRow } from "./modules/condition/condition-row";
import { ConditionModal } from "./shared/ui/ConditionModal";
import { ExpressionModal } from "./shared/ui/ExpressionModal";

import type { Route, RouteWithoutId } from "./shared/components/types/routes.types";
import type { Condition } from "./shared/components/types/condition.types";
import type { Expression } from "./shared/components/types/expression.types";
import { RouteModal } from "./shared/ui/RouteModal";
import { objectsList } from "./shared/components/Objects/indexObject";
import { ActionsInCell } from "./shared/ui/ActionsInCell";

type CellActions = { objectId: number; routeId: number; conditionId: number | null; type: string };

function App() {
  //////////////////////////////////////////////////////////////////////////////
  // ROUTES ///////////////////////////////////////////////////////////////////
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeUrlSelected, setRouteUrlSelected] = useState<string>("");
  const [showRouteModal, setShowRouteModal] = useState(false);

  function handleRoute(show: boolean) {
    setShowRouteModal(show);
  }
  function addRoute(route: RouteWithoutId) {
    const newRoute = structuredClone(routes);
    const id = newRoute[newRoute.length - 1]?.id ?? 0;

    newRoute.push({ ...route, id: id + 1 });

    setRoutes(newRoute);
  }
  function addRouteCondition(routeUrl: string, condition: Condition) {
    let newRoutes = structuredClone(routes);

    newRoutes = newRoutes.map((route: Route) => {
      if (route.url === routeUrl) {
        const id = route.conditions[route.conditions.length - 1]?.id ?? 0;
        route.conditions.push({ ...condition, id: id + 1 });
        return { ...route };
      }
      return route;
    });

    setRoutes(newRoutes);
    setSelectedCondition(null);
    setRouteUrlSelected("");
    setShowExpression(false);
    setShowCondition(false);
  }
  function removeRouteCondition(routeId: number, conditionId: number) {
    let newRoutes = structuredClone(routes);

    newRoutes = newRoutes.map((route: Route) => {
      if (route.id === routeId) {
        route.conditions = route.conditions.filter((cond) => cond.id !== conditionId);
        return { ...route };
      }
      return route;
    });

    setRoutes(newRoutes);
  }

  //////////////////////////////////////////////////////////////////////////////
  // CONDITION ////////////////////////////////////////////////////////////////
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [showCondition, setShowCondition] = useState(false);

  function newConditionModal(status: boolean, route: string) {
    setRouteUrlSelected(route);
    setShowCondition(status);
  }
  function handleCondition(status: boolean) {
    setShowCondition(status);
  }
  function addCondition(condition: Condition) {
    if (condition.params?.length) {
      setSelectedCondition(condition);
      handleExpression(true);
    } else {
      addRouteCondition(routeUrlSelected, condition);
      handleCondition(false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  // EXPRESSION ////////////////////////////////////////////////////////////////
  const [showExpression, setShowExpression] = useState(false);

  function addExpression(operator: string, expression: Expression | string) {
    if (selectedCondition) {
      if (typeof expression == "string") {
        addRouteCondition(routeUrlSelected, { ...selectedCondition, operator, expressions: expression });
      } else {
        addRouteCondition(routeUrlSelected, { ...selectedCondition, operator, expressions: [{ ...expression }] });
      }
    }
  }
  function handleExpression(status: boolean) {
    setShowExpression(status);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // OBJECTS - ACTIONS /////////////////////////////////////////////////////////
  const [objects, setObjects] = useState(objectsList);
  const [showCellActions, setShowCellActions] = useState<CellActions | null>(null);

  function handleMouse(route: CellActions | null) {
    setShowCellActions(route);
  }

  return (
    <div className="w-full flex max-w-3xl bg-slate-200 text-sm font-sans">
      <div className="w-full">
        {/* HEADER */}
        <div className="min-h-14 flex flex-col items-center bg-slate-300 px-2 py-1 border-b border-slate-400">
          <span className="font-semibold">All the events</span>
          <span className="text-slate-600">All the objects</span>
        </div>

        <div>
          {routes.map((route, idx) => (
            <div key={idx}>
              <div className="min-h-14  flex items-center border-t bg-slate-400 border-slate-300 px-2 py-1">
                <div className="px-2 text-gray-600">{idx + 1}</div>
                <div className="min-w-4 text-center">•</div>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex items-center pl-2 py-1 select-none text-white font-bold">
                    <span>ROUTE</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center px-2 py-1 select-none text-white font-bold text-lg">
                    <img src={route.icon} className="w-8 h-8 border border-gray-400 bg-gray-300" />
                    <span>{route.url}</span>
                  </div>
                </div>
              </div>

              {route.conditions.map((cond, index) => (
                <ConditionRow
                  key={`${route.url}/${cond.id}/${index}`}
                  conditionIndex={index}
                  routeId={route.id}
                  routeIndex={idx}
                  condition={cond}
                  // updateCondition={updateCondition}
                  removeCondition={removeRouteCondition}
                />
              ))}

              <div
                onClick={() => newConditionModal(true, route.url)}
                className="pl-14 py-3 cursor-pointer hover:bg-gray-300 border-t border-gray-300"
              >
                + New condition
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={() => handleRoute(true)}
          className="px-2 py-1 cursor-pointer hover:bg-gray-300 border-t border-gray-300"
        >
          + New Route
        </div>
      </div>

      <div className="bg-white">
        <div className="min-w-20 min-h-14 max-h-14">
          {objects.map((obj) => (
            <div className="w-20">
              <div key={obj.name} className="w-20 relative">
                <div className="h-14  flex flex-col justify-center items-center bg-gray-300 border border-slate-400">
                  <img src={obj.icon} className="min-w-8 min-h-8" />
                  {obj.name}
                </div>
              </div>

              <div className="min-w-20 min-h-14 max-h-14">
                <div className="w-20 relative">
                  {routes.map((route) => (
                    <div key={route.id}>
                      <div
                        onClick={() => null}
                        onMouseEnter={() =>
                          handleMouse({ objectId: obj.id, routeId: route.id, conditionId: null, type: "ROUTE" })
                        }
                        onMouseLeave={() => handleMouse(null)}
                        className="h-14 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-transparent cursor-pointer"
                      >
                        {route.actions.length ? `${route.actions.length} actions` : ""}
                        {showCellActions &&
                          showCellActions.type == "ROUTE" &&
                          // route.actions.length != 0 &&
                          // obj.id == showCellActions.objectId &&
                          showCellActions.routeId == route.id &&
                          showCellActions.conditionId == null && (
                            <div className={`absolute min-w-36 border-2 border-slate-600 p-2 bg-sky-400 rounded-md`}>
                              <ActionsInCell actions={route.actions} />
                            </div>
                          )}
                      </div>

                      {route.conditions.map((condition) => (
                        <div
                          key={`${route.id}/${condition.id}`}
                          onClick={() => null}
                          onMouseEnter={() =>
                            handleMouse({
                              objectId: obj.id,
                              routeId: route.id,
                              conditionId: condition.id,
                              type: "ROUTE",
                            })
                          }
                          className="h-12 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-transparent cursor-pointer"
                        >
                          {route.actions.length ? `${route.actions.length} actions` : ""}
                          {showCellActions &&
                            showCellActions.type == "CONDITION" &&
                            condition.actions.length != 0 &&
                            obj.id == showCellActions.objectId &&
                            showCellActions.routeId == route.id &&
                            showCellActions.conditionId == condition.id && (
                              <div className="min-w-16 min-h-5 border-2 bg-sky-400"></div>
                            )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showRouteModal && <RouteModal addRoute={addRoute} setShow={handleRoute} />}
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
