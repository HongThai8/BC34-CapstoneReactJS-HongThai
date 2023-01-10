import { DISPLAY_LOADING, HIDE_LOADING } from "../actions/types/loadingType"


const stateDefault = {
    isLoading: false,
}

export const loadingReducer = (state = stateDefault, action) => {
    switch(action.type) {

        case DISPLAY_LOADING: {
            return {...state, isLoading: true}
        }

        case HIDE_LOADING: {
            return {...state, isLoading: false}
        }
        
        default: return {...state}
    }
}