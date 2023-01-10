import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN, USER_LOGIN } from "../../../../util/settings/config";

const { Option } = Select;

const Header = (props) => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDungReducer);

  const { t, i18n } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            className="self-center px-8 py-3 rounded"
            onClick={() => {
              //Dùng history(import từ App.js) để chuyển hướng sang trang login
              history.push("/login");
            }}
          >
            {t("signin")}
          </button>
          <button
            className="self-center px-8 py-3 font-semibold rounded text-gray-50"
            onClick={() => {
              history.push("/register");
            }}
          >
            {t("signup")}
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          className="self-center px-8 py-3 rounded"
          onClick={() => {
            history.push("/profile");
          }}
        >
          Hello! <span className="text-orange-500">{userLogin.taiKhoan}</span>
        </button>
        <button
          className="text-green-500 mr-5"
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESS_TOKEN);
            history.push("/home");
            window.location.reload();
          }}
        >
          Đăng xuất
        </button>
      </Fragment>
    );
  };

  return (
    // header của mamui.com
    <header className="px-4 bg-opacity-40 bg-gray-600 text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          to="/"
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2 w-40"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn.vn"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              Home
            </NavLink>
            {/* activeClasName để khi bấm vào nó tự hiện border bottom */}
          </li>
          <li className="flex">
            <NavLink
              to="/profile"
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
              activeClassName="border-b-2 border-white"
            >
              Profile
            </NavLink>
          </li>
          <li className="flex">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
              activeClassName="border-b-2 border-white"
              onClick={() => {
                history.push("/admin");
              }}
            >
              Admin pages
            </a>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
