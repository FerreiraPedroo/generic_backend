import { icons } from "../../../../assets/img";
import type { Condition } from "../../types/condition.types";

export const serverConditions: Condition[] = [
  {
    id: 100,
    name: "SERVER IS UP",
    icon: icons.server,
    params: null,
    operator: null,
    expressions: null,
  },
  { id: 101, name: "SERVER PORT NUMBER", icon: icons.server, params: ["number"], operator: null, expressions: null },
];
