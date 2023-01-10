import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { quanLyDatVeAction } from '../../redux/actions/quanLyDatVeAction';
import style from './Checkout.module.css'
import './Checkout.css'
import { CHANGE_TAB_ACTIVE, DAT_VE } from '../../redux/actions/types/quanLyDatVeType';
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { CheckOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import { quanLyNguoiDungAction } from '../../redux/actions/quanLyNguoiDungAction';
import moment from 'moment';
import { history } from '../../App';
import { NavLink } from 'react-router-dom';
import { ACCESS_TOKEN, USER_LOGIN } from '../../util/settings/config';
const Checkout = (props) => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDungReducer);
  
  // console.log("userLogin: ", userLogin);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.quanLyDatVeReducer);
  console.log("danhSachGheKhachDat: ", danhSachGheKhachDat);
  // console.log("chiTietPhongVe: ", chiTietPhongVe);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const dispatch = useDispatch();

  useEffect(() => {
    const action = quanLyDatVeAction.layChiTietPhongVeAction(
      props.match.params.id
    );

    dispatch(action);

    //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    // connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
    //   console.log('danhSachGheKhachDat', dsGheKhachDat);
    // })
  }, []);

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDuocDat" : "";
      //Kiểm tra từng ghế đang render xem có trong mảng ghế đang đặt hay không
      let classGheDangDat = "";
      let classGheDaDatByMine =
        userLogin.taiKhoan === ghe.taiKhoanNguoiDat ? "gheDaDatByMine" : "";
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      //Kiểm tra từng ghế render xem có phải ghế người khác đặt hay không
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD != -1) {
        classGheKhachDat = "gheKhachDat";
      }
      if (indexGheDD != -1) {
        classGheDangDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDatByMine}`}
            key={index}
            onClick={() => {
              dispatch({
                type: DAT_VE,
                payload: ghe,
              });
            }}
          >
            {ghe.daDat ? (
              classGheDaDatByMine != "" ? (
                <UserOutlined
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <CheckOutlined
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {/* nếu 1 hàng đủ 16 ghế thì tự động xuống dòng */}
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid xl:grid-cols-6 2xl:grid-cols-12">
        <div className="col-span-9 flex flex-col items-center">
          {/* //Màn hình, search kiếm css của hình thang */}
          {/* // search: 'filter drop-shadow online' để tạo thêm độ bóng phù hợp với màn hình */}
          <h3 className="text-orange-500 text-2xl font-bold">Màn hình</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>

          <div className={`${style["trapezoid"]} mt-5`}></div>
          {/* Hàng ghế */}
          <div className="mt-[60px]">{renderSeats()}</div>
          <div className="mt-5">
            <table className="border-collapse border border-slate-500">
              <thead className="px-5">
                <tr>
                  <th className="border p-5 border-slate-600 ...">Ghế</th>
                  <th className="border border-slate-600 ...">Phân loại</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-4 border-slate-700 ...">
                    <button className="gheChuThich bg-white"></button>
                  </td>
                  <td className="border px-2 border-slate-700 ...">
                    <span className="text-xl">Ghế thường</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-4 border-slate-700 ...">
                    <button className="bg-orange-700 gheChuThich"></button>
                  </td>
                  <td className="border px-2 border-slate-700 ...">
                    <span className="text-xl text-orange-700">Ghế VIP</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-4 border-slate-700 ...">
                    <button className="bg-green-500 gheChuThich"></button>
                  </td>
                  <td className="border px-2 border-slate-700 ...">
                    <span className="text-xl text-green-500">
                      Ghế đang chọn 
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-4 border-slate-700 ...">
                    <button className="bg-yellow-500 gheChuThich"></button>
                  </td>
                  <td className="border px-2 border-slate-700 ...">
                    <span className="text-xl text-yellow-500">Ghế đã đặt</span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-4 border-slate-700 ...">
                    <button className="bg-yellow-500 gheChuThich">
                      <CheckOutlined
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </button>
                  </td>
                  <td className="border px-2 border-slate-700 ...">
                    <span className="text-xl text-yellow-500">
                      Ghế đã đặt bởi những người khác
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border p-4 border-slate-700 ...">
                    <button className="bg-yellow-500 gheChuThich">
                      <UserOutlined
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </button>
                  </td>
                  <td className="border px-2 border-slate-700 ...">
                    <span className="text-xl text-yellow-500">
                      Ghế đã đặt bởi tài khoản của bạn
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:col-span-6 2xl:col-span-3 mt-2">
          <h3 className="text-white text-center text-4xl">THANH TOÁN</h3>
          <hr />
          <h3 className="text-green-400 text-3xl text-center mt-2">
            {danhSachGheDangDat
              .reduce((tong, ghe, index) => {
                return (tong += ghe.giaVe);
              }, 0)
              .toLocaleString()}
            đ
          </h3>
          <hr />
          <h3 className="text-xl text-white">{thongTinPhim.tenPhim}</h3>
          <p>
            Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="flex flex-col my-5">
            <div className="">
              <span className="text-red-400 text-lg">Ghế:</span>
              {_.sortBy(danhSachGheDangDat, ["maGhe", "stt"]).map(
                (gheDD, index) => {
                  return (
                    <span className="text-green-500" key={index}>
                      {" "}
                      [{gheDD.stt}]
                    </span>
                  );
                }
              )}
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="flex flex-col-reverse justify-center items-center">
            <button
              className="mt-5 block w-full text-2xl bg-green-500 px-3 text-center text-white py-3 font-bold"
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                // console.log('thongTinDatVe: ', thongTinDatVe);
                dispatch(quanLyDatVeAction.datVeAction(thongTinDatVe));
              }}
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = (props) => {
  const { tabActive } = useSelector((state) => state.quanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.quanLyNguoiDungReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        payload: 1
      })
    }
  }, [])

  const operations = <Fragment>
    {!_.isEmpty(userLogin) ?
      <Fragment>
        <button onClick={() => {
          history.push('/profile')
        }}>
          <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-3 rounded-full bg-blue-500">{userLogin.taiKhoan.substr(0, 1)}
          </div>Hello ! <span className='text-orange-500'>{userLogin.taiKhoan}</span></button>
        <button className="text-green-500" onClick={()=>{
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESS_TOKEN);
            history.push('/home');
            window.location.reload();
        }}>Đăng xuất</button>
      </Fragment>
       : ''}


  </Fragment>
  return <div className='p-5 bg-black'>
    <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive.toString()} onChange={(key) => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        payload: key
      })
    }}>
      <Tabs.TabPane tab="CHỌN GHẾ & THANH TOÁN" key="1">
        <Checkout {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
        <KetQuaDatVe {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<NavLink className='text-lg text-white' to='/home'>Back to home</NavLink>} key='3'>
</Tabs.TabPane>
      </Tabs>
    </div>
};
export default App;
export const KetQuaDatVe = (props) => {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.quanLyNguoiDungReducer
  );
  const { userLogin } = useSelector((state) => state.quanLyNguoiDungReducer);

  useEffect(() => {
    const action = quanLyNguoiDungAction.layThongTinNguoiDungAction();
    dispatch(action);
  }, []);

  console.log("thongTinNguoiDung: ", thongTinNguoiDung);

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);

      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-white title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="">
                Giờ đặt:{" "}
                <span className="text-blue-600">
                  {moment(ticket.ngayDat).format("hh:mm A")}
                </span>{" "}
                - Ngày đặt:{" "}
                <span className="text-blue-600">
                  {moment(ticket.ngayDat).format("DD-MM-YYYY")}
                </span>
              </p>
              <p>
                Địa điểm:{" "}
                <span className="text-blue-600">{seats.tenHeThongRap}</span>
              </p>
              <p>
                Tên rạp:{" "}
                <span className="text-blue-600">{seats.tenCumRap}</span> - Ghế:{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-blue-600" key={index}>
                      {" "}
                      [{ghe.tenGhe}]
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <section className="text-gray-400 bg-black body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Lịch sử đặt vé
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-blue-500">
              Đặt vé thành công
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
};
