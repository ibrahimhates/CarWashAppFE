import { SHOW_NOTIFICATION } from "../actions/notificationAction";

const initialState = {
    type: "",
    message: "",
    description: ""
};

const notificationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                type: action.payload.type,
                message: action.payload.message,
                description: action.payload.description
            };

        default:
            return state;
    }
};

export default notificationReducer;