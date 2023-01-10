import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../App";

const Film_Flip = (props) => {
  const { item } = props;

  return (
    <div>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={item.hinhAnh}
              alt={item.tenPhim}
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          <div
            className="flip-card-back"
            style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <img
                src={item.hinhAnh}
                alt={item.tenPhim}
                style={{ width: "250px", height: "250px" }}
              />
            </div>
            <div
              className="w-full h-full"
              style={{
                position: "absolute",
                backgroundColor: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <div className="rounded-full cursor-pointer">
                  <PlayCircleOutlined style={{ fontSize: "50px" }} />
                </div>
                <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-2 bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 text-success-50 font-bold"
          onClick={() => {
            history.push(`/detail/${item.maPhim}`);
          }}
        >
          ĐẶT VÉ
        </div>
      </div>
    </div>
  );
};

export default Film_Flip;
