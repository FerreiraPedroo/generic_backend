import { useState } from "react";
import { serverCondition } from "./server-conditions";
import { serverExpression } from "./server-expression";
import { icons } from "../../../../assets/img";
import type { Condition } from "../../types/condition.types";
import type { Expression } from "../../types/expression.types";

export function ServerObject({
  addCondition = () => null,
  handleExpression = () => null,
  type,
}: {
  addCondition?: any;
  handleExpression?: any;
  type: string;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [object, setObject] = useState({
    id: 1,
    name: "SERVER",
    icon: icons.server,
    conditions: serverCondition,
    expressions: serverExpression,
  });

  const handleConditionSelected = (condition: Condition) => {
    addCondition({ ...condition });
    setIsOpenMenu(false);
  };
  const handleExpressionSelected = (expression: Expression) => {
    handleExpression(expression);
    setIsOpenMenu(false);
  };

  return (
    <div key="database" className="w-20 relative">
      {/* SELECT */}
      <div
        onClick={() => setIsOpenMenu((prev) => !prev)}
        className="h-14 border flex flex-col justify-center items-center bg-gray-300 cursor-pointer"
      >
        <img src={object.icon} className="w-8 h-8" />
        {object.name}
      </div>

      {/* MENU CONDITION */}
      {isOpenMenu && type == "condition" && (
        <div
          className="absolute top-6 z-10 bg-blue-100 border border-gray-400 shadow p-1 rounded-md"
          onMouseLeave={() => setIsOpenMenu(false)}
        >
          {object.conditions.map((condition: any) => (
            <div
              key={condition.name}
              onClick={() => handleConditionSelected(condition)}
              className="w-30 px-2 py-1 hover:bg-blue-600 hover:text-white hover:border-blue-300 cursor-pointer text-sm rounded-sm"
            >
              {condition.name}
            </div>
          ))}
        </div>
      )}

      {/* MENU EXPRESSION */}
      {isOpenMenu && type == "expression" && (
        <div
          className="absolute top-6 z-10 bg-blue-100 border border-gray-400 shadow"
          onMouseLeave={() => setIsOpenMenu(false)}
        >
          {object.expressions.map((expression: any) => (
            <div
              key={expression.menuName}
              onClick={() => handleExpressionSelected(expression.expressionName)}
              className="w-30 px-2 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-xs"
            >
              {expression.menuName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
