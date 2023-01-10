import React, { Fragment, useEffect } from 'react'
import { Button, Table } from 'antd';

import { Input, Space } from 'antd';
import { AudioOutlined, EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App';
import { quanLyPhimAction } from '../../../../redux/actions/quanLyPhimAction';
import { forInRight } from 'lodash';
import { quanLyNguoiDungAction } from '../../../../redux/actions/quanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/config';

export default function Dashboard() {

  const { Search } = Input;
  const { userList } = useSelector(state => state.quanLyNguoiDungReducer);

  const dispatch = useDispatch();

  console.log('userList', userList);

  useEffect(() => {
    dispatch(quanLyNguoiDungAction.layDanhSachNguoiDungAction(GROUPID));
  }, [])


  let i = 1
  for (let value of userList) {
    value.stt = i
    i++
  }
  console.log(userList);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      sorter: (a, b) => a.stt - b.stt,
      sortDirections: ['descend', 'ascend'],
      width: '5%',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
      width: '20%'
    },
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      width: '15%'
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      sortDirections: ['descend', 'ascend'],
      width: '15%'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sortDirections: ['descend', 'ascend'],
      width: '5%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDT',
      sortDirections: ['descend', 'ascend'],
      width: '10%'
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      sortDirections: ['descend', 'ascend'],
      width: '15%'
    },
    {
      title: 'Hành động',
      dataIndex: 'stt',
      sortDirections: ['descend', 'ascend'],
      width: '15%',
      render: (text, user) => {
        return <Fragment>
          <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/users/edit/${user.taiKhoan}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
          <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
            //Gọi action xoá
            if (window.confirm('Bạn có chắc muốn xoá người dùng ' + user.taiKhoan)) {
                //Gọi action
                dispatch(quanLyNguoiDungAction.xoaNguoiDungAction(user.taiKhoan));
            }
          }}><DeleteOutlined style={{ color: 'red' }} /> </span>
        </Fragment>
      },
    },
  ];

  const data = userList;



  const onSearch = (value) => {
    console.log("value: ", value);

    //Gọi api layDanhSachNguoiDung
    dispatch(quanLyNguoiDungAction.layDanhSachNguoiDungAction(GROUPID, value));

  };

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>


      <h3 className="text-4xl">Bạn phải dùng tài khoản Quantri để thêm xóa sửa phim , người dùng</h3>
      <Button className="mb-5" onClick={() => {
        history.push('/admin/users/adduser');
      }}>Thêm người dùng</Button>
      {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} /> */}
      <Search
        className="mb-5"
        placeholder="Nhập thông tin người dùng"
        enterButton={<SearchOutlined />}
        size="large"

        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"stt"} />
    </div>
  )
}
