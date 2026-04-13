import { useState } from "react";

import "./App.css";
import { ConditionRow } from "./modules/condicoes/condicao-linha";
import { ConditionModal } from "./shared/ui/ConditionModal";
import { ExpressionModal } from "./shared/ui/ExpressionModal";

type Condition = {
  id: number;
  name: string;
  params: any[];
};

function App() {
  const [objects, setObjects] = useState([
    {
      id: 1,
      name: "DB:TABLE:USER",
      expressions: [
        { id: 100200, name: "GET FIRST ID", params: [] },
        { id: 100201, name: "GET USER BY ID" },
      ],
      //                 > esse id é o id da função, que será chamada que tem o nome da condition.
      conditions: [{ id: 1, name: "SELECT USER BY ID", params: ["string"] }],
    },
  ]);
  const [conditions, setConditions] = useState<Condition[]>([
    {
      id: 1, // id do options dos objetos, que é uma função que pode ter um parametro ou não.
      name: "SELECT USER BY ID", // nome da options selecionada,
      params: [200],
    },
  ]);
  const [showCondition, setShowCondition] = useState(false);
  const [showExpression, setShowExpression] = useState(false);

  function addCondition() {
    setShowCondition(true);

    // setConditions((prev) => [
    //   ...prev,
    //   {
    //     id: crypto.randomUUID(),
    //     field: "New condition",
    //     operator: "",
    //     value: "",
    //   },
    // ]);
  }

  function updateCondition(id: string, data: Partial<Condition>) {
    setConditions((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  }

  function removeCondition(id: string) {
    setConditions((prev) => prev.filter((c) => c.id != id));
  }

  return (
    <div className="w-full max-w-3xl border border-gray-400 bg-gray-200 text-sm font-sans">
      {/* HEADER */}
      <div className="bg-gray-300 px-2 py-1 border-b border-gray-400 flex flex-col items-center">
        <span className="font-semibold">All the events</span>
        <span className="text-gray-600">All the objects</span>
      </div>

      {/* LIST */}
      <div>
        {conditions.map((cond, index) => (
          <ConditionRow
            key={cond.id}
            index={index}
            cond={cond}
            updateCondition={updateCondition}
            removeCondition={removeCondition}
          />
        ))}

        {/* ADD ROW */}
        <div onClick={addCondition} className="px-2 py-1 cursor-pointer hover:bg-gray-300 border-t border-gray-300">
          + New condition
        </div>
      </div>

      {showCondition && <ConditionModal objects={objects} setShow={setShowCondition} />}
      {showExpression && <ExpressionModal objects={objects} setShow={setShowCondition} />}
    </div>
  );
}

export default App;
