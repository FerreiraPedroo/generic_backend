import React, { useState } from "react";
import { objectsList } from "../components/Objects/indexObject";
import type { Expression } from "../components/types/expression.types";
import { expressionList } from "../components/Objects/indexExpression";

export function ExpressionModal({ setShow, selectedCondition, addExpression }: any) {
  const [objects] = useState(objectsList);

  const [expression, setExpression] = useState<Expression | null>();
  const [operator, setOperator] = useState<string>("equal");
  const [param, setParam] = useState<string>("");
  const [status, setStatus] = useState<string>("ERROR");

  function handleOperator(e: any) {
    setOperator(e.target.value);
  }

  function handleExpression(paramExpression: string) {
    // PROCURA EM TODAS AS EXPRESSÕES DE TODOS OS OBJETOS
    for (const expObj of expressionList) {
      const exp = expObj.find((exp) => exp.expressionName == paramExpression);
      if (exp) {
        setParam(paramExpression);
        setStatus("OK");
        setExpression(exp);
        break;
      } else {
        setParam(paramExpression);
        setExpression(null);

        // O TEXTO INSERIDO É STRING VÁLIDA COM DUAS ASPAS DUPLAS
        if (
          (paramExpression.length >= 2 && paramExpression.startsWith('"') && paramExpression.endsWith('"')) ||
          (paramExpression.length >= 1 && Number(paramExpression) >= 0)
        ) {
          setStatus("OK");
        } else {
          setStatus("ERROR");
        }
        break;
      }
    }
  }

  function handleConfirm() {
    addExpression(operator, expression ?? param);
    setShow(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-500/50 flex justify-center z-100">
      <div className="relative w-150 h-100 flex flex-col bg-slate-400 border border-gray-600 shadow-md shad rounded-md top-1/10">
        {/* TITLE */}
        <div className="w-full rounded-t-md px-4 py-2 text-xl bg-slate-300">Editor de expressão</div>

        {/* PARAM */}
        <div className="w-full px-4 py-4 items-center gap-1 ">
          <div className="flex gap-4 items-center pb-4 font-medium text-lg">
            <div className="flex items-center">
              <img className="w-10" src={selectedCondition.icon} />
              <span>{selectedCondition.name}</span>
            </div>
            <select
              className="bg-slate-900 py-1 px-2 text-white outline-0 rounded-sm text-sm"
              onChange={(e) => handleOperator(e)}
            >
              <option value="equal">Equal</option>
              <option value="different">Different</option>
              <option value="lower">Lower</option>
              <option value="lower or equal">Lower or Equal</option>
              <option value="greater">Greater</option>
              <option value="greater or equal">Greater or Equal</option>
            </select>
          </div>

          <input
            type="text"
            value={param}
            onChange={(e) => handleExpression(e.target.value)}
            className="w-full rounded-sm bg-white p-2 outline-0"
          />
        </div>
        <div
          className={`self-end text-center mr-4 w-40 border-2 border-t-neutral-500 border-l-neutral-500 border-b-neutral-300 border-r-neutral-300 font-medium uppercase ${status == "ERROR" && "bg-red-500  text-red-100"} ${status == "OK" && "bg-green-500 text-green-950 "}`}
        >
          {status}
        </div>

        <div className="grow m-4 p-1 border-3 border-t-stone-600 border-l-stone-600 border-r-stone-50 border-b-stone-50">
          <div className="flex flex-wrap gap-2">
            {objects.map((obj) => obj({ handleExpression, type: "expression" }))}
          </div>
        </div>

        <div className="w-full h-14 flex justify-end pb-4 px-4 rounded-b-md gap-4">
          <input
            type="button"
            value="Cancelar"
            className="place-self-center border py-2 px-4 bg-stone-200 rounded-sm hover:cursor-pointer hover:drop-shadow-lg"
            onClick={() => setShow(false)}
          />
          <input
            type="button"
            value="Confirmar"
            className="place-self-center border py-2 px-4 bg-stone-200 rounded-sm hover:cursor-pointer hover:drop-shadow-lg disabled:bg-stone-500 disabled:shadow-inner disabled:shadow-stone-800"
            disabled={status != "OK"}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
}
