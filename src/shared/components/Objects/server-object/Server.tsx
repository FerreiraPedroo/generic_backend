import { useState } from "react";
import { serverObject } from "./serverObject";
import { serverConditions } from "./server-conditions";
import { serverExpressions } from "./server-expressions";
import { serverActions } from "./server-actions";
import type { Condition } from "../../types/condition.types";
import type { Expression } from "../../types/expression.types";
import type { Action } from "../../types/actions.types";

export function Conditions({
  setIsOpenMenu,
  handleAddCondition,
}: {
  setIsOpenMenu: (value: boolean) => void;
  handleAddCondition: (condition: Condition) => void;
}) {
  return (
    <div className={`w-20 relative`}>
      <div
        className="absolute top-6 z-10 bg-blue-100 border border-gray-400 shadow p-1 rounded-md"
        onMouseLeave={() => setIsOpenMenu(false)}
      >
        {serverConditions.map((condition: Condition) => (
          <div
            key={condition.name}
            onClick={() => handleAddCondition(condition)}
            className="w-30 px-2 py-1 hover:bg-blue-600 hover:text-white hover:border-blue-300 cursor-pointer text-sm rounded-sm"
          >
            {condition.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Expressions({
  setIsOpenMenu,
  handleAddExpression,
}: {
  setIsOpenMenu: (value: boolean) => void;
  handleAddExpression: (expression: string) => void;
}) {
  return (
    <div
      className="absolute top-6 z-10 bg-blue-100 border border-gray-400 shadow"
      onMouseLeave={() => setIsOpenMenu(false)}
    >
      {serverExpressions.map((expression: Expression) => (
        <div
          key={expression.menuName}
          onClick={() => handleAddExpression(expression.expressionName)}
          className="w-30 px-2 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-xs"
        >
          {expression.menuName}
        </div>
      ))}
    </div>
  );
}

export function Actions({
  routeId,
  conditionId,
  addAction,
}: {
  routeId: number;
  conditionId: number | null;
  addAction: (routeId: number, conditionId: number | null, action: Action) => void;
}) {
  return (
    <div className="z-10 bg-slate-200 shadow">
      <p className="p-1 m-1 text-center border-b border-b-slate-500">Add action</p>
      {serverActions.map((action: Action) => (
        <div
          key={action.name}
          onClick={() => addAction(routeId, conditionId, action)}
          className="px-2 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-xs"
        >
          {action.name}
        </div>
      ))}
    </div>
  );
}

export function Server({
  addCondition = () => null,
  handleExpression = () => null,
  type,
}: {
  addCondition?: any;
  handleExpression?: any;
  type: string;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleAddCondition = (condition: Condition) => {
    addCondition({ ...condition });
    setIsOpenMenu(false);
  };
  const handleAddExpression = (expression: string) => {
    handleExpression(expression);
    setIsOpenMenu(false);
  };

  return (
    <div className="w-20 relative">
      {/* SELECT */}
      <div
        onClick={() => setIsOpenMenu((prev) => !prev)}
        className="h-14  flex flex-col justify-center items-center bg-gray-300 border border-slate-400 cursor-pointer"
      >
        <img src={serverObject.icon} className="min-w-8 min-h-8" />
        {serverObject.name}
      </div>

      {/* // MENU CONDITION */}
      {isOpenMenu && type == "condition" && (
        <Conditions handleAddCondition={handleAddCondition} setIsOpenMenu={setIsOpenMenu} />
      )}

      {/* // MENU EXPRESSION */}
      {isOpenMenu && type == "expression" && (
        <Expressions handleAddExpression={handleAddExpression} setIsOpenMenu={setIsOpenMenu} />
      )}
    </div>
  );
}
