import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { carouselAction } from "../../../../redux/actions/carouselActions";
import "./HomeCarousel.css";

const contentStyle = {
  height: "650px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

const HomeCarousel = (props) => {
    const {arrImg} = useSelector(state => state.carouselReducer)
    // console.log("arrImg: ", arrImg);

    const dispatch = useDispatch()

    //Tự kích hoạt khi component load ra
    useEffect( () => {

        //1 action = {type:'', data}
        //2 (phải cài Middleware): callBackFunction (dispatch)
        dispatch(carouselAction.getCarouselAction())
    }, [])


    const renderImg = () => {
        return arrImg?.map((item, index) => {
            return <div key={index}>
            <div style={{...contentStyle, backgroundImage: `url(${item.hinhAnh})`}}>
                <img src={item.hinhAnh} className='w-full opacity-0' alt={item.hinhAnh} />
            </div>
        </div>
        })
    }
  return (
    <div>
      {/* carousel của ant design */}
      <Carousel effect="fade">{renderImg()}</Carousel>
    </div>
  );
};

export default HomeCarousel;
