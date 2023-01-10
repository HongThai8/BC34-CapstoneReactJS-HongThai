import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/quanLyRapType"


const stateDefault = {
    heThongRapChieu: []
}


export const quanLyRapReducer = (state = stateDefault, {type, payload}) => {

    switch(type) {
        case SET_HE_THONG_RAP_CHIEU: {
            return {...state, heThongRapChieu: payload}
        }

        default: return {...state}
    }
}