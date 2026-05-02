import { useState } from "react";

import "./App.css";

import type { Route, RouteWithoutId } from "./shared/components/types/routes.types";
import type { Condition } from "./shared/components/types/condition.types";
import type { Expression } from "./shared/components/types/expression.types";
import type { Action } from "./shared/components/types/actions.types";

import { ConditionRow } from "./modules/condition/condition-row";
import { ConditionModal } from "./shared/ui/ConditionModal";
import { ExpressionModal } from "./shared/ui/ExpressionModal";
import { Actions } from "./shared/components/Objects/server-object/Server";
import { ActionsInCell } from "./shared/ui/ActionsInCell";
import { ActionExpressionModal } from "./shared/ui/ActionExpressionModal";

import { RouteModal } from "./shared/ui/RouteModal";
import { objectsList } from "./shared/components/Objects/indexObject";

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
  function addRouteAction(routeId: number, conditionId: number | null, action: Action) {
    const routesCopy = structuredClone(routes);

    const newRoutes = routesCopy.map((route: Route) => {
      if (routeId == route.id) {
        if (conditionId) {
          route.conditions = route.conditions.map((condition: Condition) => {
            if (condition.id == conditionId) {
              condition.actions.push({ ...action });
            }
            return condition;
          });
        } else {
          route.actions.push({ ...action });
        }
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

  function addExpressionToCondition(operator: string, expression: Expression | string) {
    if (selectedCondition) {
      if (typeof expression == "string") {
        addRouteCondition(routeUrlSelected, { ...selectedCondition, operator, expressions: expression });
      } else {
        addRouteCondition(routeUrlSelected, { ...selectedCondition, operator, expressions: [{ ...expression }] });
      }
    }
  }
  function addExpressionToAction(operator: string, expression: Expression | string) {
    if (selectedAction) {
      if (typeof expression == "string") {
        addRouteAction(selectedAction.routeId, selectedAction.conditionId, {
          ...selectedAction.action,
          operator,
          expressions: expression,
        });
      } else {
        addRouteAction(selectedAction.routeId, selectedAction.conditionId, {
          ...selectedAction.action,
          operator,
          expressions: [{ ...expression }],
        });
      }
    }
  }
  function handleExpression(status: boolean) {
    setShowExpression(status);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // OBJECTS - ACTIONS /////////////////////////////////////////////////////////
  const [objects, setObjects] = useState(objectsList);

  const [showActionExpression, setShowActionExpression] = useState(false);
  const [showCellActions, setShowCellActions] = useState<CellActions | null>(null);
  const [actionMenu, setActionMenu] = useState<CellActions | null>(null);

  const [selectedAction, setSelectedAction] = useState<{
    routeId: number;
    conditionId: number | null;
    action: Action;
  } | null>(null);

  function handleActionHover(route: CellActions | null) {
    setShowCellActions(route);
  }
  function handleActionMenu(menu: CellActions | null) {
    setActionMenu(menu);
  }
  function handleAction() {
    setShowActionExpression(false);
    setShowCellActions(null);
    setActionMenu(null);
    setSelectedAction(null);
  }

  function addAction(routeId: number, conditionId: number | null, action: Action) {
    if (action.params?.length) {
      setSelectedAction({ routeId, conditionId, action });
      setShowActionExpression(true);
    } else {
      addRouteAction(routeId, conditionId, action);
      handleAction();
    }
  }

  return (
    <div className="w-full flex max-w-3xl bg-slate-200 text-sm font-sans">
      <div className="w-full">
        {/* HEADER */}
        <div className="min-h-14 flex flex-col items-center bg-slate-300 px-2 py-1 border-b border-slate-400">
          <span className="font-semibold">All the events</span>
          <span className="text-slate-600">All the objects</span>
        </div>

        {/* ROUTES */}
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
                  <div className="flex gap-1 justify-center items-center px-2 py-1 select-none text-white font-bold text-lg">
                    <img src={route.icon} className="w-8 h-8 border border-gray-400 bg-gray-300" />
                    <span>{route.method.toUpperCase()}</span>
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

        {/* ADD ROUTES */}
        <div
          onClick={() => handleRoute(true)}
          className="px-2 py-1 cursor-pointer hover:bg-gray-300 border-t border-gray-300"
        >
          + New Route
        </div>
      </div>

      {/* OBJECTS */}
      <div className="bg-white">
        <div className="min-w-20 min-h-14 max-h-14">
          {objects.map((obj) => (
            <div key={obj.name} className="w-20">
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
                        onAuxClick={() =>
                          handleActionMenu({ objectId: obj.id, routeId: route.id, conditionId: null, type: "ROUTE" })
                        }
                        onMouseEnter={() =>
                          handleActionHover({ objectId: obj.id, routeId: route.id, conditionId: null, type: "ROUTE" })
                        }
                        onMouseLeave={() => {
                          handleActionHover(null);
                          handleActionMenu(null);
                        }}
                        className="h-14 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-transparent cursor-pointer"
                      >
                        <div className="absolute text-center min-w-full">
                          {route.actions.length ? `✓ ${route.actions.length} actions` : ""}
                        </div>

                        {/* DROPDOWN ACTIONS */}
                        {actionMenu &&
                          actionMenu.type == "ROUTE" &&
                          obj.id == actionMenu.objectId &&
                          actionMenu.routeId == route.id &&
                          actionMenu.conditionId == null && (
                            <div className={`relative w-60 border border-slate-600 bg-slate-200 p-2 rounded-md`}>
                              <Actions routeId={route.id} conditionId={null} addAction={addAction} />
                            </div>
                          )}

                        {/* ACTIONS LIST IN CELL */}
                        {showCellActions &&
                          showCellActions.type == "ROUTE" &&
                          route.actions.length != 0 &&
                          actionMenu == null &&
                          obj.id == showCellActions.objectId &&
                          showCellActions.routeId == route.id &&
                          showCellActions.conditionId == null && (
                            <div
                              className={`z-10 relative top-8 left-44 min-w-80 border-2 border-slate-500 bg-slate-200 rounded-md`}
                            >
                              <ActionsInCell actions={route.actions} />
                            </div>
                          )}
                      </div>

                      {route.conditions.length == 0 && (
                        <div className="h-12 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-transparent text-stone-200 text-4xl pb-2">
                          ⊘
                        </div>
                      )}

                      {route.conditions.map((condition) => (
                        <div
                          key={`${route.id}/${condition.id}`}
                          onAuxClick={() =>
                            handleActionMenu({
                              objectId: obj.id,
                              routeId: route.id,
                              conditionId: condition.id,
                              type: "CONDITION",
                            })
                          }
                          onMouseEnter={() =>
                            handleActionHover({
                              objectId: obj.id,
                              routeId: route.id,
                              conditionId: condition.id,
                              type: "CONDITION",
                            })
                          }
                          onMouseLeave={() => {
                            handleActionHover(null);
                            handleActionMenu(null);
                          }}
                          className="h-12 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-transparent cursor-pointer"
                        >
                          <div className="absolute text-center min-w-full">
                            {condition.actions.length ? `✓ ${condition.actions.length} actions` : ""}
                          </div>

                          {/* DROPDOWN ACTIONS */}
                          {actionMenu &&
                            actionMenu.type == "CONDITION" &&
                            obj.id == actionMenu.objectId &&
                            actionMenu.routeId == route.id &&
                            actionMenu.conditionId == condition.id && (
                              <div className={`relative w-60 border border-slate-600 bg-slate-200 p-2 rounded-md`}>
                                <Actions routeId={route.id} conditionId={condition.id} addAction={addAction} />
                              </div>
                            )}

                          {/* ACTIONS LIST IN CELL */}
                          {showCellActions &&
                            showCellActions.type == "CONDITION" &&
                            condition.actions.length > 0 &&
                            actionMenu == null &&
                            obj.id == showCellActions.objectId &&
                            showCellActions.routeId == route.id &&
                            showCellActions.conditionId == condition.id && (
                              <div
                                className={`z-10 relative top-8 left-44 min-w-80 border-2 border-slate-500 bg-slate-200 rounded-md`}
                              >
                                <ActionsInCell actions={condition.actions} />
                              </div>
                            )}
                        </div>
                      ))}

                      {route.conditions.length >= 1 && (
                        <div className="h-12 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-transparent text-stone-200 text-4xl pb-2">
                          ⊘
                        </div>
                      )}
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
          addExpression={addExpressionToCondition}
          selectedCondition={selectedCondition}
        />
      )}
      {showActionExpression && (
        <ActionExpressionModal
          setShow={setShowActionExpression}
          addExpression={addExpressionToAction}
          selectedAction={selectedAction && selectedAction.action}
        />
      )}
    </div>
  );
}

export default App;
