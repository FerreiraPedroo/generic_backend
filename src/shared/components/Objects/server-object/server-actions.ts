import { icons } from "../../../../assets/img";
import type { Action } from "../../types/actions.types";

export const serverActions: Action[] = [
  {
    id: 200200,
    name: "GET SERVER IP",
    type: "number",
    icon: icons.server,
    operator: null,
    params: null,
    expressions: null
  },
  {
    id: 200201,
    name: "GET SERVER PORT",
    type: "number",
    icon: icons.server,
    operator: null,
    params: null,
    expressions: null
  },
];
