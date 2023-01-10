import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM_EDIT } from "../actions/types/quanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/quanLyRapType";


const stateDefault = {
    arrFilm: [
        {
            "maPhim": 1408,
            "tenPhim": "Jurassic World New",
            "biDanh": "jurassic-world-new",
            "trailer": "",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/jurassic-world-new_gp01.jpg",
            "moTa": "A new theme park is built on the original site of Jurassic Park. Everything is going well until the park's newest attraction--a genetically modified giant stealth killing machine--escapes containment and goes on a killing spree.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-10-15T17:37:52.38",
            "danhGia": 10,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 1408,
            "tenPhim": "Jurassic World New",
            "biDanh": "jurassic-world-new",
            "trailer": "",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/jurassic-world-new_gp01.jpg",
            "moTa": "A new theme park is built on the original site of Jurassic Park. Everything is going well until the park's newest attraction--a genetically modified giant stealth killing machine--escapes containment and goes on a killing spree.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-10-15T17:37:52.38",
            "danhGia": 10,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        },
    ],
    dangChieu: true,
    sapChieu: false,
    arrFilmDefault: [],
    filmdetail: [],
    thongTinPhimEdit: {},

}

export const quanLyPhimReducer = (state = stateDefault, {type, payload}) => {
    switch(type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = payload;
            state.arrFilmDefault = payload
            return {...state}
        }

        case SET_PHIM_DANG_CHIEU: {
            state.dangChieu = true
            state.sapChieu = !state.dangChieu
            let filmDangChieu = state.arrFilmDefault?.filter((item) => item.dangChieu === true && item.sapChieu === false)
            return {...state, arrFilm: filmDangChieu}
        }

        case SET_PHIM_SAP_CHIEU: {
            state.sapChieu = true
            state.dangChieu = !state.sapChieu
            let filmSapChieu = state.arrFilmDefault?.filter(item => item.sapChieu === true && item.dangChieu === false)
            return {...state, arrFilm: filmSapChieu}
        }

        case SET_CHI_TIET_PHIM: {
            return {...state, filmdetail: payload}
        }

        case SET_THONG_TIN_PHIM_EDIT: {
            return {...state, thongTinPhimEdit: payload}
        }

        default: return {...state}
}
}