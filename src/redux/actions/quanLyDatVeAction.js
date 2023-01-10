import { connection } from "../..";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./loadingAction";
import { quanLyNguoiDungAction } from "./quanLyNguoiDungAction";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/loadingType";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "./types/quanLyDatVeType";


export const quanLyDatVeAction = {
    layChiTietPhongVeAction: (maLichChieu) => {
        return async (dispatch) => {
            try {
                const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)
                // console.log("result: ", result.data.content);
                if (result.status === 200) {
                    dispatch({
                        type: SET_CHI_TIET_PHONG_VE,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors);
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },

    datVeAction: (thongTinDatVe = new ThongTinDatVe()) => {

        return async (dispatch, getState) => {
            try {
                dispatch(displayLoadingAction)
                const result = await quanLyDatVeService.datVe(thongTinDatVe)
                // console.log("result: ", result.data.content);
                //khi đặt vé thành công thì phải load lại phòng vé
                await dispatch(quanLyDatVeAction.layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
                await dispatch({ type: DAT_VE_HOAN_TAT })
                await dispatch(quanLyNguoiDungAction.layThongTinNguoiDungAction())
                await dispatch(hideLoadingAction)

                // let userLogin = getState().QuanLyNguoiDungReducer.userLogin;
                // connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu);

                dispatch({ type: CHUYEN_TAB })

            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
        
    },


}
