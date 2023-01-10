import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Space,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import { values } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyPhimAction } from '../../../../redux/actions/quanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()
    const { thongTinPhimEdit } = useSelector(state => state.quanLyPhimReducer)
    console.log("thongTinPhimEdit: ", thongTinPhimEdit);

    useEffect(() => {
        const action = quanLyPhimAction.layThongTinPhimEditAction(props.match.params.id)
        dispatch(action)
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhimEdit.maPhim,
            tenPhim: thongTinPhimEdit.tenPhim,
            trailer: thongTinPhimEdit.trailer,
            moTa: thongTinPhimEdit.moTa,
            dangChieu: thongTinPhimEdit.dangChieu,
            sapChieu: thongTinPhimEdit.sapChieu,
            hot: thongTinPhimEdit.hot,
            danhGia: thongTinPhimEdit.danhGia,
            ngayKhoiChieu: thongTinPhimEdit.ngayKhoiChieu,
            hinhAnh: null,
            maNhom: GROUPID
        },
        onSubmit: (values) => {
            console.log("values: ", values);
            values.maNhom = GROUPID
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);

                    }
                }
            }
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(quanLyPhimAction.capNhatPhimUploadAction(formData, props.match.params.id))
        }
    })

    const handleChangeDatePicker = (vl, blaa) => {
        console.log("value: ", vl);
        console.log('blaa: ', blaa);
        // let ngayChieu = vl.format('DD/MM/YYYY')
        return formik.setFieldValue('ngayKhoiChieu', blaa)
    }

    const handleChangeSwitch = (name) => {

        return (value) => {
            return formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {

        return (value) => {
            return formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file);
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);//Hình base 64
            }

        }
    }

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <div><Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <Form.Item label="Kích thước" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Nhỏ</Radio.Button>
                    <Radio.Button value="default">Mặc định</Radio.Button>
                    <Radio.Button value="large">Lớn</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={'DD/MM/YYYY'} placeholder='Chọn ngày' onChange={handleChangeDatePicker} defaultValue={moment(formik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang chiếu">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label='Hình ảnh'>
                <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                <br />
                <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? thongTinPhimEdit.hinhAnh : imgSrc} />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type='submit' className='bg-blue-500 p-2 text-white'>Cập nhật</button>
            </Form.Item>
        </Form></div>
    )
}

export default Edit