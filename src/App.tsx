import { useState } from "react";

import "./App.css";

import type { Route, RouteWithoutId } from "./shared/components/types/routes.types";
import type { Condition, ConditionGroup } from "./shared/components/types/condition.types";
import type { Expression } from "./shared/components/types/expression.types";
import type { Action } from "./shared/components/types/actions.types";

import { ConditionsRow } from "./modules/condition/conditions-row";
import { ConditionModal } from "./shared/ui/ConditionModal";
import { ExpressionModal } from "./shared/ui/ExpressionModal";
import { Actions } from "./shared/components/Objects/server-object/Server";
import { ActionsInCell } from "./shared/ui/ActionsInCell";
import { ActionExpressionModal } from "./shared/ui/ActionExpressionModal";

import { RouteModal } from "./shared/ui/RouteModal";
import { objectsList } from "./shared/components/Objects/indexObject";
import { actionClass } from "./shared/utils/classBuild";

type CellActions = { objectId: number; routeUrl: string; conditionIndex: number | null; type: string };
type RouteCondition = { routeUrl: string; conditionIndex: number | null };

function App() {
  //////////////////////////////////////////////////////////////////////////////
  // ROUTES ///////////////////////////////////////////////////////////////////
  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeConditionSelected, setRouteConditionSelected] = useState<RouteCondition>({
    routeUrl: "",
    conditionIndex: null,
  });
  const [showRouteModal, setShowRouteModal] = useState(false);

  function handleRoute(show: boolean) {
    setShowRouteModal(show);
  }
  function addRoute(route: RouteWithoutId) {
    const routesClone = structuredClone(routes);
    /**
     * Aqui vai ter o O(n2)
     */
    /**
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */

    const routeUrl = route.url.split("/");

    routesClone.forEach((routeClone) => {
      const routeCloneUrl = routeClone.url.split("/");

      const routeCompare = routeCloneUrl.every((value, index) => {
        console.log(value, routeUrl[index]);
        if (value == routeUrl[index]) {
          return true;
        }
        console.log(value.startsWith(":"), routeUrl[index].startsWith(":"));
        if (value.startsWith(":") && routeUrl[index].startsWith(":")) {
          return true;
        }
      });
    });

    // newRoutes.push({ ...route });
    // setRoutes(newRoutes);
  }
  function addRouteCondition(routeCondition: RouteCondition, condition: Condition) {
    let newRoutes = structuredClone(routes);

    newRoutes = newRoutes.map((route: Route) => {
      if (route.url === routeCondition.routeUrl) {
        if (routeCondition.conditionIndex === null) {
          route.conditionsGroup.push({
            conditions: [{ ...condition }],
            actions: [],
          });
        } else {
          route.conditionsGroup[routeCondition.conditionIndex].conditions.push({ ...condition });
        }
      }
      return route;
    });

    setRoutes(newRoutes);
    setSelectedCondition(null);
    setRouteConditionSelected({ routeUrl: "", conditionIndex: null });
    setShowExpression(false);
    setShowCondition(false);
  }
  function addRouteAction(routeUrl: string, conditionIndex: number | null, action: Action) {
    const routesCopy = structuredClone(routes);

    const newRoutes = routesCopy.map((route: Route) => {
      if (routeUrl == route.url) {
        if (conditionIndex == null) {
          route.actions.push({ ...action });
        } else {
          route.conditionsGroup[conditionIndex].actions.push({ ...action });
        }
      }
      return route;
    });

    setRoutes(newRoutes);

    setSelectedCondition(null);
    setRouteConditionSelected({ routeUrl: "", conditionIndex: null });
    setShowExpression(false);
    setShowCondition(false);
  }
  function removeRouteCondition(routeUrl: string, conditionsIndex: number, conditionId: number) {
    let newRoutes = structuredClone(routes);

    newRoutes = newRoutes.map((route: Route) => {
      if (route.url === routeUrl) {
        route.conditionsGroup[conditionsIndex].conditions = route.conditionsGroup[conditionsIndex].conditions.filter(
          (condition: Condition) => condition.id !== conditionId,
        );

        if (!route.conditionsGroup[conditionsIndex].conditions.length) {
          route.conditionsGroup = route.conditionsGroup.filter((conditions) => conditions.conditions.length);
        }
      }

      return route;
    });

    setRoutes(newRoutes);
  }

  //////////////////////////////////////////////////////////////////////////////
  // CONDITION ////////////////////////////////////////////////////////////////
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [showCondition, setShowCondition] = useState(false);

  function conditionModal(routeUrl: string, conditionIndex: number | null) {
    setRouteConditionSelected({ routeUrl, conditionIndex });
    setShowCondition(true);
  }
  function handleCondition(status: boolean) {
    setShowCondition(status);
  }
  function addCondition(condition: Condition) {
    if (condition.params?.length) {
      setSelectedCondition(condition);
      handleExpression(true);
    } else {
      addRouteCondition(routeConditionSelected, condition);
      handleCondition(false);
    }
  }
  function negateCondition(routeIndex: number, conditionsGroupIndex: number, conditionIndex: number) {
    let newRoutes = structuredClone(routes);

    newRoutes = newRoutes.map((route: Route, index: number) => {
      if (routeIndex == index) {
        route.conditionsGroup[conditionsGroupIndex].conditions = route.conditionsGroup[
          conditionsGroupIndex
        ].conditions.map((condition: Condition, index) => {
          if (conditionIndex == index) {
            condition.not = !condition.not;
          }
          return condition;
        });
      }

      return route;
    });

    setRoutes(newRoutes);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // EXPRESSION ////////////////////////////////////////////////////////////////
  const [showExpression, setShowExpression] = useState(false);

  function addExpressionToCondition(operator: string, expression: Expression | string) {
    if (selectedCondition) {
      if (typeof expression == "string") {
        addRouteCondition(routeConditionSelected, { ...selectedCondition, operator, expressions: expression });
      } else {
        addRouteCondition(routeConditionSelected, { ...selectedCondition, operator, expressions: [{ ...expression }] });
      }
    }
  }
  function addExpressionToAction(operator: string, expression: Expression | string) {
    if (selectedAction) {
      if (typeof expression == "string") {
        addRouteAction(selectedAction.routeUrl, selectedAction.conditionIndex, {
          ...selectedAction.action,
          operator,
          expressions: expression,
        });
      } else {
        addRouteAction(selectedAction.routeUrl, selectedAction.conditionIndex, {
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
    routeUrl: string;
    conditionIndex: number | null;
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
  function addAction(routeUrl: string, conditionIndex: number | null, action: Action) {
    if (action.params?.length) {
      setSelectedAction({ routeUrl, conditionIndex, action });
      setShowActionExpression(true);
    } else {
      addRouteAction(routeUrl, conditionIndex, action);
      handleAction();
    }
  }

  return (
    <div className="w-full flex max-w-3xl bg-slate-200 text-sm font-sans">
      {/* HEADER / ROUTES / CONDITIONS */}
      <div className="w-full">
        {/* HEADER */}
        <div className="min-h-14 max-h-14 flex flex-col items-center bg-slate-300 px-2 py-1 border border-slate-400">
          <span className="font-semibold">All the events</span>
          <span className="text-slate-600">All the objects</span>
        </div>

        {/* ROUTES / CONDITIONS */}
        <div>
          {routes.map((route, idx) => (
            <div key={idx}>
              <div className="max-h-14 min-h-14 flex items-center bg-slate-500 border-b border-b-slate-400 px-2 py-1">
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

              {route.conditionsGroup.map((conditionGroup, index) => (
                <ConditionsRow
                  key={`${route.url}/${index}`}
                  routeIndex={idx}
                  routeUrl={route.url}
                  conditionGroup={conditionGroup}
                  conditionsGroupIndex={index}
                  // updateCondition={updateCondition}
                  removeCondition={removeRouteCondition}
                  conditionModal={conditionModal}
                  negateCondition={negateCondition}
                />
              ))}

              <div
                onClick={() => conditionModal(route.url, null)}
                className="min-h-10 max-h-10 pl-14 pt-2 cursor-pointer hover:bg-gray-300 border-b border-b-slate-400"
              >
                + New condition
              </div>
            </div>
          ))}
        </div>

        {/* ADD ROUTES */}
        <div
          onClick={() => handleRoute(true)}
          className="min-h-10 max-h-10 px-2 py-2 cursor-pointer hover:bg-gray-300 border-b border-b-slate-400"
        >
          + New Route
        </div>
      </div>

      {/* ACTIONS: SHOW OBJECTS LIST / CONDITION ACTION LIST */}
      <div className="bg-white">
        <div className="min-w-20 min-h-14 max-h-14 ">
          {objects.map((obj) => (
            <div key={obj.name} className="h-14 w-20">
              {/* OBJECT ICON */}
              <div key={obj.name} className="h-14 w-20 relative">
                <div className="h-14  flex flex-col justify-center items-center bg-gray-300 border border-slate-400">
                  <img src={obj.icon} className="min-w-8 min-h-8" />
                  {obj.name}
                </div>
              </div>
              {/* ACTIONS IN CONDITIONS */}
              <div className="min-w-20 min-h-14 max-h-14">
                <div className="w-20 relative">
                  {routes.map((route, index) => (
                    <div key={`${route.url}/${index}`}>
                      <div
                        onAuxClick={() =>
                          handleActionMenu({
                            objectId: obj.id,
                            routeUrl: route.url,
                            conditionIndex: null,
                            type: "ROUTE",
                          })
                        }
                        onMouseEnter={() =>
                          handleActionHover({
                            objectId: obj.id,
                            routeUrl: route.url,
                            conditionIndex: null,
                            type: "ROUTE",
                          })
                        }
                        onMouseLeave={() => {
                          handleActionHover(null);
                          handleActionMenu(null);
                        }}
                        className="h-14 flex flex-col justify-center items-center bg-white border border-slate-400 border-t-0 cursor-pointer "
                      >
                        <div className="absolute text-center min-w-full">
                          {route.actions.length ? `✓ ${route.actions.length} actions` : ""}
                        </div>

                        {/* ROUTE: SHOW DROPDOWN ACTIONS */}
                        {actionMenu &&
                          actionMenu.type == "ROUTE" &&
                          obj.id == actionMenu.objectId &&
                          actionMenu.routeUrl == route.url &&
                          actionMenu.conditionIndex == null && (
                            <div className={`relative w-60 border border-slate-600 bg-slate-200 p-2 rounded-md`}>
                              <Actions routeUrl={route.url} conditionIndex={null} addAction={addAction} />
                            </div>
                          )}

                        {/* ROUTE: SHOW ACTIONS LIST IN CELL */}
                        {showCellActions &&
                          showCellActions.type == "ROUTE" &&
                          route.actions.length != 0 &&
                          actionMenu == null &&
                          obj.id == showCellActions.objectId &&
                          showCellActions.routeUrl == route.url &&
                          showCellActions.conditionIndex == null && (
                            <div
                              className={`z-10 relative top-8 left-44 min-w-80 border-2 border-slate-500 bg-slate-200 rounded-md`}
                            >
                              <ActionsInCell actions={route.actions} />
                            </div>
                          )}
                      </div>

                      {route.conditionsGroup.map((conditionGroup, index) => (
                        <div
                          key={`${route.url}/${index}`}
                          onAuxClick={() =>
                            handleActionMenu({
                              objectId: obj.id,
                              routeUrl: route.url,
                              conditionIndex: index,
                              type: "CONDITION",
                            })
                          }
                          onMouseEnter={() =>
                            handleActionHover({
                              objectId: obj.id,
                              routeUrl: route.url,
                              conditionIndex: index,
                              type: "CONDITION",
                            })
                          }
                          onMouseLeave={() => {
                            handleActionHover(null);
                            handleActionMenu(null);
                          }}
                          className={`flex flex-col justify-center items-center bg-white border border-slate-400 border-t-0 cursor-pointer py-2 ${
                            actionClass[conditionGroup.conditions!.length.toString()]
                          }`}
                        >
                          <div className="absolute text-center min-w-full">
                            {conditionGroup.actions.length ? `✓ ${conditionGroup.actions.length} actions` : ""}
                          </div>

                          {/* CONDITION: SHOW DROPDOWN ACTIONS */}
                          {actionMenu &&
                            actionMenu.type == "CONDITION" &&
                            obj.id == actionMenu.objectId &&
                            actionMenu.routeUrl == route.url &&
                            actionMenu.conditionIndex == index && (
                              <div className={`relative w-60 border border-slate-600 bg-slate-200 p-2 rounded-md`}>
                                <Actions routeUrl={route.url} conditionIndex={index} addAction={addAction} />
                              </div>
                            )}

                          {/* CONDITION: SHOW ACTIONS LIST IN CELL */}
                          {showCellActions &&
                            showCellActions.type == "CONDITION" &&
                            conditionGroup.actions.length > 0 &&
                            actionMenu == null &&
                            obj.id == showCellActions.objectId &&
                            showCellActions.routeUrl == route.url &&
                            showCellActions.conditionIndex == index && (
                              <div
                                className={`z-10 relative top-8 left-44 min-w-80 border-2 border-slate-500 bg-slate-200 rounded-md`}
                              >
                                <ActionsInCell actions={conditionGroup.actions} />
                              </div>
                            )}
                        </div>
                      ))}

                      <div className="min-h-10 max-h-10 flex flex-col justify-center items-center bg-white-200 border border-slate-400 border-t-0 text-stone-200 text-4xl pb-2">
                        ⊘
                      </div>
                    </div>
                  ))}
                  <div className="min-h-10 max-h-10 flex flex-col justify-center items-center bg-white-200 border border-slate-400 border-t-0 text-stone-200 text-4xl pb-2">
                    ⊘
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALS */}
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
