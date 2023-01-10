
import { api } from "../constants/api"


export const quanLyNguoiDungService = {
    dangNhap: (thongTinDangNhap) => {
        return api.post(`QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    },

    layThongTinNguoiDung: () => {
        return api.post(`QuanLyNguoiDung/ThongTinTaiKhoan`)
    },

    dangKy: (thongTinNguoiDung) => {
        return api.post(`QuanLyNguoiDung/DangKy`, thongTinNguoiDung)
    },

    layDanhSachNguoiDung: (maNhom, tuKhoa) => {
        if(tuKhoa.trim() !== '') {
            return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${tuKhoa}`)
        }
        return api.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`)
    },

    themNguoiDung: (thongTinNguoiDung) => {
        return api.post(`QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung)
    },

    xoaNguoiDung: (taiKhoan) => {
        return api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    },

    layThongTinNguoiDungEdit: () => {
        return api.post(`QuanLyNguoiDung/ThongTinTaiKhoan`)
    },

    layThongTinAdminEdit: (taiKhoan) => {
        return api.post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    },

    capNhatThongTinNguoiDung: (thongTinNguoiDung) => {
        return api.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNguoiDung)
    },
    capNhatThongTinUser: (thongTinNguoiDung) => {
        return api.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNguoiDung)
    }
}
