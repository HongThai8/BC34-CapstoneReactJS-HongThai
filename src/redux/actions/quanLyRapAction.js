import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "./types/quanLyRapType";


export const quanLyRapAction = {
    layDanhSachHeThongCumRapAcTion: () => {
        return async (dispatch) => {
            try {
                const result = await quanLyRapService.LayDanhSachHeThongRap()
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    payload: result.data.content
                })
            } catch (errors) {
                console.log('errors: ', errors);
            }
        }
    },

    layThongTinChiTietPhim: (id) => {
        return async (dispatch) => {
            try {
                const result = await quanLyRapService.LayThongTinLichChieuPhim(id)
                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    payload: result.data.content
                })
            } catch (errors) {
                console.log("errors: ", errors);
            }

        }
    },
}
