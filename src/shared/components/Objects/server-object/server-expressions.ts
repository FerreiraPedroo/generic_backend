import { icons } from "../../../../assets/img";
import type { Expression } from "../../types/expression.types";

export const serverExpressions: Expression[] = [
  {
    id: 200200,
    menuName: "GET SERVER IP",
    expressionName: "$server[GET SERVER IP]",
    type: "number",
    icon: icons.server,
  },
  {
    id: 200201,
    menuName: "GET SERVER PORT",
    expressionName: "$server[GET SERVER PORT]",
    type: "number",
    icon: icons.server,
  },
];
