import { useState } from "react";
import { Dropdown } from "../components/Dropdown";

export function ExpressionModal({ objects, setShow }: any) {

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/75 flex justify-center">
      <div className="relative w-150 h-100 flex flex-col bg-gray-200 border border-gray-400 shadow-md shad rounded-md top-1/10">
        <div className="w-full h-12 rounded-t-md"></div>

        <div className=" grow m-4 p-1 border-3 border-t-stone-600 border-l-stone-600 border-r-stone-50 border-b-stone-50">
          <div className="flex flex-wrap gap-2">
            {objects.map((obj) => (
              <Dropdown value={obj.name} options={obj.options} onSetParam={(v) => null} />
            ))}
          </div>
        </div>

        <div className="w-full h-14 flex justify-end pb-4 px-4 rounded-b-md ">
          <input
            type="button"
            value="Cancelar"
            className="place-self-center border py-2 px-4 bg-stone-200 rounded-sm hover:cursor-pointer hover:drop-shadow-lg"
            onClick={() => setShow(false)}
          />
        </div>
      </div>
    </div>
  );
}
