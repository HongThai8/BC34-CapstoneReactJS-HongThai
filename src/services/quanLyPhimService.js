import { GROUPID } from "../util/settings/config";
import { api } from "../constants/api"

export const quanLyPhimService = {
    layDanhSachBanner: () => {
        return api.get(`QuanLyPhim/LayDanhSachBanner`)
    },

    layDanhSachPhim: (tenPhim='') => {
        if(tenPhim.trim() !== '') {
            return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    },

    themPhimUploadHinh: (formData) => {
        return api.post(`QuanLyPhim/ThemPhimUploadHinh`, formData)
    },

    layThongTinPhimEdit: (maPhim) => {
        return api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    },

    capNhatPhimUpload: (formData) => {
        return api.post(`QuanLyPhim/CapNhatPhimUpload`, formData)
    },

    xoaPhim: (maPhim) => {
        return api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    },
}