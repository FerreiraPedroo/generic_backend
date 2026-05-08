import { icons } from "../../../../assets/img";
import type { Condition } from "../../types/condition.types";

export const serverConditions: Condition[] = [
  {
    id: 200100,
    name: "SERVER IS UP",
    functionName: "SERVER_IS_UP",
    icon: icons.server,
    not: false,
    params: null,
    operator: null,
    expressions: null,
  },
  {
    id: 200101,
    name: "SERVER PORT NUMBER",
    functionName: "SERVER_PORT_NUMBER",
    icon: icons.server,
    not: false,
    params: ["number"],
    operator: null,
    expressions: null,
  },
  {
    id: 200102,
    name: "HEADER AUTHENTICATION <Bearer>",
    functionName: "SERVER_HEADER_AUTHENTICATION",
    icon: icons.server,
    not: false,
    params: ["string"],
    operator: null,
    expressions: null,
  },
];
