import { icons } from "../../../../assets/img";
import type { Condition } from "../../types/condition.types";

export const serverConditions: Condition[] = [
  {
    id: 100100,
    name: "SERVER IS UP",
    functionName: "SERVER_IS_UP",
    icon: icons.server,
    not: false,
    params: null,
    operator: null,
    expressions: null,
    actions: [],
  },
  {
    id: 100101,
    name: "SERVER PORT NUMBER",
    functionName: "SERVER_PORT_NUMBER",
    icon: icons.server,
    not: false,
    params: ["number"],
    operator: null,
    expressions: null,
    actions: [],
  },
  {
    id: 100102,
    name: "HEADER AUTHENTICATION IS PRESENT",
    functionName: "SERVER_HEADER_AUTHENTICATION",
    icon: icons.server,
    not: false,
    params: null,
    operator: null,
    expressions: null,
    actions: [],
  },
];
