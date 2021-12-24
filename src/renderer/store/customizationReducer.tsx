// project imports
import config from 'renderer/config';

// action - state management
import * as actionTypes from './actions';

type CustomizationState = {
    isOpen: string[];
    fontFamily: string;
    borderRadius: number;
    opened: boolean;
}

// NOTE: intersection type
type Action = CustomizationState & {
    type: string;
    id: string; 
}

export const initialState: CustomizationState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action: Action): CustomizationState => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer;
