import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config"
import { DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_EDIT, SET_THONG_TIN_USER_EDIT } from "../actions/types/quanLyNguoiDungType"

let user = {};
if(localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    userList: [],
    thongTinNguoiDungEdit: {},
    thongTinUserEdit: {}
}

export const quanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION : {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}
        }

        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung
            return {...state}
        }

        case SET_DANH_SACH_NGUOI_DUNG: {
            state.userList = action.payload
            return {...state}
        }

        case SET_THONG_TIN_NGUOI_DUNG_EDIT: {
            state.thongTinNguoiDungEdit = action.thongTinNguoiDungEdit
            return {...state}
        }

        case SET_THONG_TIN_USER_EDIT: {
            state.thongTinUserEdit = action.thongTinUserEdit
            return {...state}
        }

        default: return { ...state }
    }
}