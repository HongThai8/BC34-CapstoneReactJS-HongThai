import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_EDIT, SET_THONG_TIN_USER_EDIT } from "./types/quanLyNguoiDungType";
import { history } from '../../App'
import { GROUPID } from "../../util/settings/config";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/loadingType";

export const quanLyNguoiDungAction = {
    dangNhapAction: (thongTinDangNhap) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
                if (result.data.statusCode === 200) {
                    await dispatch({
                        type: DANG_NHAP_ACTION,
                        thongTinDangNhap: result.data.content
                    });
                    await dispatch({
                        type: HIDE_LOADING,
                    })
                    alert('Đăng nhập thành công!')
                    //Chuyển hướng đăng nhập về trang trước đó
                    history.push('/home');
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                await dispatch({
                    type: HIDE_LOADING,
                })
                alert('Đăng nhập thất bại')
            }
        }
    },
    layThongTinNguoiDungAction: () => {
        return async (dispatch) => {
            try {
                const result = await quanLyNguoiDungService.layThongTinNguoiDung()
                if (result.data.statusCode === 200) {
                    // console.log('result: ', result.data.content);
                    dispatch({
                        type: SET_THONG_TIN_NGUOI_DUNG,
                        thongTinNguoiDung: result.data.content
                    });

                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    dangKyAction: (thongTinNguoiDung) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                const result = await quanLyNguoiDungService.dangKy(thongTinNguoiDung)
                if (result.data.statusCode === 200) {
                    // console.log('result: ', result.data.content);
                    await dispatch({
                        type: HIDE_LOADING,
                    })
                    alert('Đăng ký thành công!')
                    history.push('/login')
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
                await dispatch({
                    type: HIDE_LOADING,
                })
                alert('Đăng ký thất bại!')
            }
        }
    },

    layDanhSachNguoiDungAction: (maNhom, tuKhoa = '') => {
        return async (dispatch) => {
            try {
                const result = await quanLyNguoiDungService.layDanhSachNguoiDung(maNhom, tuKhoa)
                if (result.data.statusCode === 200) {
                    // console.log('result: ', result.data.content);
                    dispatch({
                        type: SET_DANH_SACH_NGUOI_DUNG,
                        payload: result.data.content
                    })
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },

    themNguoiDungAction: (thongTinNguoiDung) => {
        return async (dispatch) => {
            try {
                const result = await quanLyNguoiDungService.themNguoiDung(thongTinNguoiDung)
                if (result.data.statusCode === 200) {
                    // console.log('result: ', result.data.content);
                    alert('Thêm người dùng thành công!')
                    history.goBack()
                }
            } catch (errors) {
                console.log('errors: ', errors.reponse?.data);
            }
        }
    },
    xoaNguoiDungAction: (taiKhoan) => {
        return async (dispatch) => {

            try {
                const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
                // console.log('result: ', result.data.content);
                alert('Xóa thành công!')
                // Sau khi xóa, load lại danh sách phim mới
                dispatch(quanLyNguoiDungAction.layDanhSachNguoiDungAction(GROUPID))
            } catch (errors) {
                alert('Bạn không thể xóa người dùng này')
                console.log("errors: ", errors.reponse?.data);
            }
        }
    },

    layThongTinAdminEditAction: (taiKhoan) => {
        return async (dispatch) => {
            dispatch({
                type: DISPLAY_LOADING,
            })
            
            try {
                const result = await quanLyNguoiDungService.layThongTinAdminEdit(taiKhoan)
                if (result.data.statusCode === 200) {
                    // console.log('result: ', result.data.content);
                    await dispatch({
                        type: SET_THONG_TIN_NGUOI_DUNG_EDIT,
                        thongTinNguoiDungEdit: result.data.content
                    });
                    await dispatch({
                        type: HIDE_LOADING
                    })
                    
                }
            } catch (errors) {
                console.log('errors: ', errors);
            }
        }
    },

    layThongTinUserEditAction: (taiKhoan) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            
            try {
                const result = await quanLyNguoiDungService.layThongTinNguoiDungEdit(taiKhoan)
                if (result.data.statusCode === 200) {
                    // console.log('result: ', result.data.content);
                    await dispatch({
                        type: SET_THONG_TIN_USER_EDIT,
                        thongTinUserEdit: result.data.content
                    });
                    await dispatch({
                        type: HIDE_LOADING
                    })
                    
                }
            } catch (errors) {
                console.log('errors: ', errors);
            }
        }
    },

    capNhatThongTinNguoiDungAction: (thongTinNguoiDung) => {
        return async (dispatch) => {

            try {
                let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinNguoiDung)
                window.confirm('Lưu thay đổi ?')
                alert('Cập nhật thông tin người dùng thành công!')
                // console.log('result: ', result.data.content);
                dispatch(quanLyNguoiDungAction.layDanhSachNguoiDungAction(GROUPID, ''))
                history.push('/admin/users')
            } catch (errors) {
                alert('Cập nhật thất bại !')
                console.log("errors: ", errors.reponse?.data);
            }
        }
    },

    capNhatThongTinUserAction: (thongTinNguoiDung) => {
        return async (dispatch) => {
            await dispatch({
                type: DISPLAY_LOADING,
            })
            try {
                let result = await quanLyNguoiDungService.capNhatThongTinUser(thongTinNguoiDung)
                // console.log('result: ', result.data.content);
                await dispatch({
                    type: HIDE_LOADING,
                })
                alert('Cập nhật thông tin thành công!')
            } catch (errors) {
                await dispatch({
                    type: HIDE_LOADING,
                })
                alert('Cập nhật thất bại !')
                console.log("errors: ", errors.reponse?.data);
            }
        }
    }
}