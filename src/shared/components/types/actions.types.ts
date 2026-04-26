import type { Expression } from "./expression.types";

export type Action = {
  id: number;
  name: string;
  type: string;
  icon: string;
  operator: string | null;
  params: [string] | null;
  expressions: [Expression] | string | null;
};
