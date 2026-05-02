import type { Action } from "./actions.types";
import type { Condition } from "./condition.types";

export type Route = {
  id: number;
  url: string;
  method: string;
  icon: string;
  params: string[];
  queries?: { key: string; value: string }[];
  actions: Action[];
  conditions: Condition[];
};

export type RouteWithoutId = Omit<Route, "id">;
