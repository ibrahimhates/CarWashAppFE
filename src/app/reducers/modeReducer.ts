import { CHANGE_MODE } from "../actions/modeAction";

const initialState = "light";

const modeReducer = (state = initialState, action: any) => {
   switch(action.type){
      case CHANGE_MODE:
         return action.payload;

      default:
         return state;
   }
}

export default modeReducer;