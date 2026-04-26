import { icons } from "../../../../assets/img";
import { Actions, Conditions, Expressions, Server } from "./Server";

export const serverObject = {
  id: 1,
  name: "SERVER",
  icon: icons.server,
  object: Server,
  conditions: Conditions,
  expressions: Expressions,
  actions: Actions,
};