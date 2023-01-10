import { GROUPID } from "../util/settings/config";
import { api } from "../constants/api"
import { ApiTwoTone } from "@ant-design/icons";

export const quanLyRapService = {
    LayDanhSachHeThongRap: () => {
        return api.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    },

    LayThongTinLichChieuPhim: (maPhim) => {
        return api.get(`QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`)
    },
    
    LayThongTinHeThongRap: () => {
        return api.get(`QuanLyRap/LayThongTinHeThongRap`)
    },

    LayThongTinCumRap: (maHeThongRap) => {
        return api.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}