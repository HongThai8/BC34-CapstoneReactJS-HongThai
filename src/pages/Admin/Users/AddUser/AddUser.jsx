import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import FormItem from 'antd/lib/form/FormItem'
import FormList from 'antd/lib/form/FormList'
import { useField, useFormik } from 'formik'
import { values } from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../../../../App'
import { quanLyNguoiDungAction } from '../../../../redux/actions/quanLyNguoiDungAction'
import { GROUPID } from '../../../../util/settings/config'
import * as Yup from 'yup'

const AddUser = () => {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUPID,
      maLoaiNguoiDung: '',
      hoTen: '',
    },
    onSubmit: values => {
      console.log("values: ", values);
      const action = quanLyNguoiDungAction.themNguoiDungAction(values)
      dispatch(action)
    },
    validationSchema: Yup.object({
      hoTen: Yup.string()
        .min(2, "Họ tên ít nhất 2 ký tự!")
        .max(32, "Họ tên nhiều nhất 32 ký tự!")
        .required("Không được bỏ trống!"),
      email: Yup.string()
        .email("Email phải đúng định dạng!")
        .required("Không được bỏ trống!"),
      matKhau: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 ký tự!")
        .required("Không được bỏ trống!"),
      soDt: Yup.string()
        .min(9, "Số điện thoại ít nhất 9 ký tự!")
        .max(16, "Số điện thoại nhiều nhất 16 ký tự!")
        .required("Không được bỏ trống!"),
      taiKhoan: Yup.string()
        .min(2, "Tài khoản ít nhất 2 ký tự!")
        .max(32, "Tài khoản nhiều nhất 32 ký tự!")
        .required("Không được bỏ trống!"),
    })
  })

  const handleChangeSelect = (event) => {
    // console.log('event: ', event.target.value);
    return formik.setFieldValue('maLoaiNguoiDung', event.target.value)
  }

  return (
    <form onSubmit={
      formik.handleSubmit
    } className="w-full px-5 md:px-10 h-screen">
      <div className="mb-10">
        <h1 className="font-bold text-3xl text-gray-900">Thêm người dùng</h1>
      </div>
      <div className='grid lg:grid-cols-2'>
        <div className="flex -mx-3 mr-2">
          <div className="w-full px-3 mb-5">
            <label htmlFor='true' className="text-xs font-semibold px-1">Tài khoản</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
              <input type="text" name='taiKhoan' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nhập tài khoản" />
            </div>
            {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className='text-red-500'>{formik.errors.taiKhoan}</p>
              )}
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor='true' className="text-xs font-semibold px-1">Email</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
              <input type="email" name='email' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="nguyenvana@gmail.com" />
            </div>
            {formik.errors.email && formik.touched.email && (
                <p className='text-red-500'>{formik.errors.email}</p>
              )}
          </div>
        </div>
        <div className="flex -mx-3 mr-2">
          <div className="w-full px-3 mb-5">
            <label htmlFor='true' className="text-xs font-semibold px-1">Mật khẩu</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
              <input type="password" name='matKhau' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nhập mật khẩu" />
            </div>
            {formik.errors.matKhau && formik.touched.matKhau && (
                <p className='text-red-500'>{formik.errors.matKhau}</p>
              )}
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor='true' className="text-xs font-semibold px-1">Họ tên</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
              <input type="text" name='hoTen' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="nguyenvana@gmail.com" />
            </div>
            {formik.errors.hoTen && formik.touched.hoTen && (
                <p className='text-red-500'>{formik.errors.hoTen}</p>
              )}
          </div>
        </div>
        <div className="flex -mx-3 mr-2">
          <div className="w-full px-3 mb-12">
            <label htmlFor='true' className="text-xs font-semibold px-1">Số điện thoại</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
              <input type="tel" name='soDt' onChange={formik.handleChange} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
            </div>
            {formik.errors.soDt && formik.touched.soDt && (
                <p className='text-red-500'>{formik.errors.soDt}</p>
              )}
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor='true' className="text-xs font-semibold px-1">Loại người dùng</label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
              <select onChange={handleChangeSelect} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                <option value='KhachHang'>Khách hàng</option>
                <option value='QuanTri'>Quản trị</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flex -mx-3'>
          <div className="w-1/2 px-3 mb-5">
            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold flex items-center justify-center" onClick={() => {
              history.push('/admin/users')
            }}><ArrowLeftOutlined className='mr-2' />Trở lại</button>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-5">
            <button type='submit' className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Thêm</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddUser