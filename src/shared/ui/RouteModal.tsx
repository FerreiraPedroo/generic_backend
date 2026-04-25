import React, { useState } from "react";

export function RouteModal({ setShow, selectedCondition, addExpression }: any) {
  const [operator, setOperator] = useState<string>("equal");
  const [route, setRoute] = useState<boolean>(false);
  const [params, setParams] = useState<string[]>([]);
  const [queries, setQueries] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("ERROR");

  function handleRoute(url: string) {
    function params() {
      // A ROTA DEVE INICIAR COM "/"
      if (url.slice(0, 1) !== "/") {
        setParams([]);
        setStatus("ERROR");
        return;
      }

      // ENCONTRA TODOS OS PARAMETROS DA ROTA
      const findParam = [...url.matchAll(/\/:/g)];
      const paramList = [];

      for (let i = 0; i < findParam.length; i++) {
        const paramsFound = findParam[i];

        const paramSliced = paramsFound.input.slice(paramsFound.index, paramsFound.input.length);
        const startSlash = paramsFound.input.slice(paramsFound.index, paramsFound.index + 2);
        const indexEndSlash = paramSliced.indexOf("/", 1);

        if (paramSliced.trim().includes(" ")) {
          setParams([]);
          setStatus("ERROR");
          return;
        }

        // VERIFICA SENÃO É O ULTIMO PARAMETRO
        if (i < findParam.length - 1) {
          // INICIA E TERMINA COM '/', SENDO QUE O PRIMEIRO É VERIFICADO COM O 'SLASH' E O SEGUNDO PELO INDEX
          if (startSlash !== "/:" || indexEndSlash === -1) {
            setParams([]);
            setStatus("ERROR");
            return;
          }

          const param = paramSliced.slice(0, indexEndSlash);
          paramList.push(param);

          continue;
        }

        // ULTIMO PARAMETRO
        if (startSlash === "/:") {
          let param;

          // SE O PARAMETRO TERMINA COM "/"
          if (paramSliced.slice(1).indexOf("/") !== -1) {
            param = paramSliced.slice(0, paramSliced.slice(1).indexOf("/") + 1);
          } else {
            param = paramSliced.slice(0);
          }

          paramList.push(param);
        }
      }

      setParams(paramList);
      setStatus("OK");
    }

    function queries() {
      const findQuery = [...url.matchAll(/\?/g)];

      if (!findQuery.length) {
        return;
      }

      const querySliced = findQuery[0].input.slice(findQuery[0].index + 1, findQuery[0].input.length);

      for(let i = 0; i < querySliced.length; i++){

      }
      
      console.log(findQuery, querySliced);
    }

    params();
    queries();
  }

  function handleConfirm() {}

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-500/50 flex justify-center z-100">
      <div className="space-y-2 relative w-150 h-100 flex flex-col bg-slate-400 border border-gray-600 shadow-md shad rounded-md top-1/10">
        {/* TITLE */}
        <div className="w-full rounded-t-md px-4 py-2 text-xl bg-slate-300">New Route</div>

        {/* PARAM */}
        <div className="w-full px-4 pt-4 pb-2 items-center gap-1 ">
          <div className="flex gap-4 items-center pb-4 font-medium text-lg">
            <div className="min-w-22 flex items-center text-lg">
              <span>URL route</span>
            </div>
            <input
              type="text"
              // value={param}
              onChange={(e) => handleRoute(e.target.value)}
              className="w-full rounded-sm bg-white px-2 py-1.5 outline-0"
            />
            {/* <span className="bg-yellow-300  text-xs px-2 py-1 rounded-full hover:cursor-pointer">?</span> */}
          </div>

          <div className="flex justify-end align-center">
            {/* <div className="w-full flex gap-4 items-center font-medium text-md">
              <div className="min-w-22 flex items-center">
                <span>Params</span>
              </div>

              <select
                className="bg-slate-900 py-0.5 px-2 text-white outline-0 rounded-sm text-sm"
                onChange={(e) => handleOperator(e)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div> */}

            <div
              className={`text-center justify-end min-w-50 border-2 border-t-neutral-500 border-l-neutral-500 border-b-neutral-300 border-r-neutral-300 font-medium uppercase ${status == "ERROR" && "bg-red-500  text-red-100"} ${status == "OK" && "bg-green-500 text-green-950 "}`}
            >
              {status}
            </div>
          </div>
        </div>

        <div className="flex grow mx-4 py-2 px-4 gap-6 border-3 border-t-stone-50 border-l-stone-50 border-r-stone-600 border-b-stone-600">
          <div className="gap-2 min-w-1/2">
            <span className="text-md font-bold">Params</span>
            <div className="space-y-1.5">
              {params.map((param, index) => (
                <p key={param} className="px-2 py-0.5 bg-slate-200 rounded-md">
                  <span className="pr-1">{index} </span>
                  {param}
                </p>
              ))}
            </div>
          </div>
          <div className="min-w-1/2">
            <span className="text-md font-bold">Query</span>
            <div className=""></div>
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
