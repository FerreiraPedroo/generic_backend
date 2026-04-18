import type { Condition } from "./condition.types";

export type Route = {
  id: number;
  name: string;
  url: string;
  params: [{ name: string; value: string }] | [];
  icon: string;
  conditions: [Condition] | [];
};
