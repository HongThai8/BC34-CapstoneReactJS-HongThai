import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Cascader, Select, DatePicker, InputNumber } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';

const Showtime = (props) => {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit: async (values) => {
      //console.log("values: ", values);
      try {
        let result = await quanLyDatVeService.taoLichChieu(values)
        alert('tạo lịch chiếu thành công!')
      } catch (errors) {
        console.log("errors: ", errors.reponse?.data);

      }
    }
  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  })

  useEffect(async () => {
    try {
      let result = await quanLyRapService.LayThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content
      })

    } catch (error) {
      console.log("error: ", error.reponse?.data);

    }


  }, [])

  const handleChangeHeThongRap = async (value) => {
    //Từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await quanLyRapService.LayThongTinCumRap(value)
      //Gán giá trị cụm rạp vào state.cumRapChieu
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (errors) {
      console.log("errors: ", errors);
    }
  }

  const handleChangeCumRap = (values) => {
    formik.setFieldValue('maRap', values)
  }

  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    // console.log('onChangeDate: ', moment(values).format('DD/MM/YYY hh:mm:ss A'));
  }

  const onOK = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    // console.log('onOk: ', moment(values).format('DD/MM/YYY hh:mm:ss A'));
  }

  const onchangeInputNumber = (values) => {
    formik.setFieldValue('giaVe', values)
  }

  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((htr, index) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
    })
  }

  let film = {};
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={formik.handleSubmit}


    >
      <h3 className="text-2xl text-center">Tạo lịch chiếu - {props.match.params.tenPhim}</h3>
      <div className='flex justify-center'>
      <img src={film.hinhAnh} alt='...' width={200} height={100} />
      </div>
      <div className='mt-5'>
      <Form.Item label="Hệ thống rạp">
        <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select options={state.cumRapChieu?.map((cumRap, index) => {
          return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
        })} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
      </Form.Item>

      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOK} />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber min={75000} max={150000} onChange={onchangeInputNumber} />
      </Form.Item>

      <Form.Item label="Xác nhận">
        <Button htmlType="submit">Tạo lịch chiếu</Button>
      </Form.Item>
      </div>
    </Form>
  )
}

export default Showtime