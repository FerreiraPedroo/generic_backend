import type { Expression } from "./expression.types";

export type Condition = {
  id: number;
  name: string;
  icon: string;
  operator: string | null;
  params: [string] | null;
  expressions: [Expression] | string | null;
};
