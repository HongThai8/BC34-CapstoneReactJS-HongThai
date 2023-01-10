import { Tabs } from "antd";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;
const contentStyle = {
  height: "100px",
  color: "#fff",
  lineHeight: "10px",
  textAlign: "center",
  background: "#364d79",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};
const HomeMenu = (props) => {
  const { heThongRapChieu } = props;
  console.log("heThongRapChieu: ", heThongRapChieu);

  const [tabPosition] = useState("top");

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane
          className="bg-black"
          tab={
            <img src={heThongRap.logo} className="rounded-full" width="60" />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      style={{
                        width: "280px",
                        display: "block",
                      }}
                    >
                      {/* <img src={cumRap.hinhAnh} width={60} /> <br /> */}
                      <div
                        style={{
                          ...contentStyle,
                          backgroundImage: `url(${cumRap.hinhAnh})`,
                        }}
                      ></div>
                      <div className="text-left ml-1 overflow-hidden">
                        {cumRap.tenCumRap}
                        <p className="text-white font-bold mt-2 text-[8px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]">
                          {cumRap.diaChi}
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/*Load phim theo tabs*/}
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="bg-black mt-2">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              style={{ height: 85, width: 85 }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/75/75";
                              }}
                            />

                            <div className="ml-2 ">
                              <h1 className="text-2xl text-white">
                                {phim.tenPhim}
                              </h1>
                              <div className="grid grid-cols-4  md:grid-cols-6  lg:grid-cols-8  xl:grid-cols-10 2xl:grid-cols-12 gap-4">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className=" text-green-400 text-[8px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px]"
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    //antd Design
    <Tabs tabPosition={tabPosition} style={{ background: "#0000009b" }}>
      {renderHeThongRap()}
    </Tabs>
  );
};

export default HomeMenu;
