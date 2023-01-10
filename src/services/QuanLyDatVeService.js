
import { api } from "../constants/api"
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe"


export const quanLyDatVeService = {//mã lịch chiếu từ url
    layChiTietPhongVe: (maLichChieu) => {
        return api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)

    },

    // thongTinDatVe = {
    //     "maLichChieu": 0,
    //     "danhSachVe": [
    //         {
    //             "maGhe": 0,
    //             "giaVe": 0
    //         }
    //     ]
    // }
    
    datVe: (thongTinDatVe = new ThongTinDatVe()) => {
        return api.post(`QuanLyDatVe/DatVe`, thongTinDatVe)
    },

    taoLichChieu: (thongTinLichChieu) => {
        return api.post(`QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
    }
}
