import { combineReducers } from "redux";
import bitcoinReducer from "./bitcoinReducer";
import brainReducer from "./brainReducer";

const rootReducer = combineReducers({
  bitcoin: bitcoinReducer,
  brain: brainReducer
})

export default rootReducer;