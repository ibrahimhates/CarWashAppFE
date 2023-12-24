import { combineReducers } from "redux";
import notificationReducer from "./notificationReducer";
import modeReducer from "./modeReducer";

const rootReducer = combineReducers({
    notification: notificationReducer,
    mode: modeReducer,
})

export default rootReducer;