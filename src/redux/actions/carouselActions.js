
import { quanLyPhimService } from "../../services/quanLyPhimService";
import { SET_CAROUSEL } from "./types/carouselType";



export const carouselAction = {
    getCarouselAction: () => {
        return async (dispatch) => {
            try {
                //sử dụng tham số: thamSo
                const result = await quanLyPhimService.layDanhSachBanner()

                //thành công thì đưa lên reducer
                // console.log("result: ", result);
                dispatch({
                    type: SET_CAROUSEL,
                    payload: result.data.content
                })

            } catch (errors) {
                console.log("errors: ", errors);
            }
        }
    }
}
