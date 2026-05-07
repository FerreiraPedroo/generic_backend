import type { Action } from "./actions.types";
import type { Expression } from "./expression.types";

export type ConditionGroup = {
  conditions: Condition[];
  actions: Action[];
};

export type Condition = {
  id: number;
  name: string;
  functionName: string;
  icon: string;
  not: boolean;
  params: string[] | null;
  operator: string | null;
  expressions: Expression[] | string | null;
};
