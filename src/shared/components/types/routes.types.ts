import type { Action } from "./actions.types";
import type { ConditionGroup } from "./condition.types";

export type Route = {
  url: string;
  method: string;
  icon: string;
  params: string[];
  queries?: { key: string; value: string }[];
  actions: Action[];
  conditionsGroup: ConditionGroup[];
};
export type RouteWithoutId = Omit<Route, "id">;
