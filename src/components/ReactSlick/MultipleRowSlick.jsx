import React from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styleSlick from "./MultipleRowSlick.module.css";
import "./MultipleRowSlick.css";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/quanLyPhimType";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();

  const { dangChieu, sapChieu } = useSelector(
    (state) => state.quanLyPhimReducer
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";

  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    return props.arrFilm?.slice(0,12).map((item, index) => {
      return <div key={index}>
        {/* <Film phim={item} /> */}
        <Film_Flip item={item} />
      </div>
    })
  }

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 200,
    rows: 2,
    slidesPerRow: 1,
    initialSlide: 3,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <button
        type="button"
        className={`px-8 py-3 font-semibold rounded ${activeClassDC}`}
        onClick={() => {
          const action = { type: SET_PHIM_DANG_CHIEU };
          dispatch(action);
        }}
      >
        ĐANG CHIẾU
      </button>
      <button
        type="button"
        className={`relative px-8 py-3 ml-4 overflow-hidden font-semibold rounded ${activeClassSC}`}
        onClick={() => {
          const action = { type: SET_PHIM_SAP_CHIEU };
          dispatch(action);
        }}
      >
        SẮP CHIẾU
        <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-violet-600">
          NEW
        </span>
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
