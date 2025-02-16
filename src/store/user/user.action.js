import { createAction } from "../../utils/reducer/reducer.utils";
import USER_ACTION from "./user.types.js";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION.CURRENT_USER, user);
