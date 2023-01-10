import { quanLyPhimService } from "../../services/quanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM_EDIT } from "./types/quanLyPhimType";
import { history } from '../../App'


export const quanLyPhimAction = {
    layDanhSachPhimAction: (tenPhim='') => {
        return async (dispatch) => {
            try {
                const result = await quanLyPhimService.layDanhSachPhim(tenPhim)
                dispatch({
                    type: SET_DANH_SACH_PHIM,
                    payload: result.data.content
                })
            } catch (errors) {
                console.log('errors: ', errors);
            }
        }
    },

    themPhimUploadHinh: (formData) => {

        return async (dispatch) => {

            try {
                let result = await quanLyPhimService.themPhimUploadHinh(formData)
                alert('Thêm phim thành công!')
                console.log('result: ', result.data.content);
                dispatch(quanLyPhimAction.layDanhSachPhimAction())
                history.push('/admin/films')
            } catch (errors) {
                console.log("errors: ", errors.reponse?.data);
            }
        }
    },

    layThongTinPhimEditAction: (maPhim) => {
        return async (dispatch) => {

            try {
                let result = await quanLyPhimService.layThongTinPhimEdit(maPhim)
                // console.log('result: ', result.data.content);
                dispatch({
                    type: SET_THONG_TIN_PHIM_EDIT,
                    payload: result.data.content
                })
            } catch (errors) {
                console.log("errors: ", errors.reponse?.data);
            }
        }
    },

    capNhatPhimUploadAction: (formData, maPhim) => {
        return async (dispatch) => {
            try {
                let result = await quanLyPhimService.capNhatPhimUpload(formData)
                alert('Cập nhật phim thành công!')
                console.log('result: ', result.data.content);
                await dispatch(quanLyPhimAction.layThongTinPhimEditAction(maPhim))
                dispatch(quanLyPhimAction.layDanhSachPhimAction())
                history.push('/admin/films')
            } catch (errors) {
                console.log("errors: ", errors.reponse?.data);
                alert('không thể cập nhật phim này!')
            }
        }
    },


    xoaPhimAction: (maPhim) => {
        return async (dispatch) => {

            try {
                const result = await quanLyPhimService.xoaPhim(maPhim)
                console.log('result: ', result.data.content);
                alert('Xóa phim thành công!')
                // Sau khi xóa, load lại danh sách phim mới
                dispatch(quanLyPhimAction.layDanhSachPhimAction())
            } catch (errors) {
                console.log("errors: ", errors.reponse?.data);
            }
        }
    }
}