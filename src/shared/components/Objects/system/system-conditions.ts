import { icons } from "../../../../assets/img";
import type { Condition } from "../../types/condition.types";

export const systemConditions: Condition[] = [
  {
    id: 100100,
    name: "SERVER IS UP",
    functionName: "SERVER_IS_UP",
    icon: icons.server,
    not: false,
    params: null,
    operator: null,
    expressions: null,
  },
];

