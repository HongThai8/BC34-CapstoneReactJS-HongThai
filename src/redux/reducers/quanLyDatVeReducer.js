import { bindActionCreators } from "redux"
import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe"
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../actions/types/quanLyDatVeType"


const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [{maGhe:'48051'}, {maGhe:'48052'}],
    tabActive: 1,
}

export const quanLyDatVeReducer = (state = stateDefault, { type, payload }) => {

    switch (type) {
        case SET_CHI_TIET_PHONG_VE: {
            return { ...state, chiTietPhongVe: payload }
        }

        case DAT_VE: {
            //Cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === payload.maGhe)
            if (index != -1) {
                //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xóa đi
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(payload)
            }

            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        }

        case DAT_VE_HOAN_TAT: {
            return {...state, danhSachGheDangDat: []}
        }

        case CHUYEN_TAB: {
            state.tabActive = 2
            return {...state}
        }

        case CHANGE_TAB_ACTIVE: {
            return {...state, tabActive: payload}
        }

        default: return { ...state }
    }

}