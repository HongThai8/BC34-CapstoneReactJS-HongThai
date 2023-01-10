import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import { values } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { quanLyPhimAction } from '../../../../redux/actions/quanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';

const AddNew = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
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
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(quanLyPhimAction.themPhimUploadHinh(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        // console.log("value: ", value);
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
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

    const handleChangeFile = (e) => {
        //Lấy ra file từ e
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Tạo 1 đối tượng để đọc file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log(e.target.result); // => data base64
                setImgSrc(e.target.result) //hình base64
            }
            // console.log("file: ", file);
            //Đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file)
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
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker name='ngayKhoiChieu' placeholder='Chọn ngày' format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
            </Form.Item>
            <Form.Item label="Đang chiếu">
                <Switch onChange={handleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Sắp chiếu">
                <Switch onChange={handleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot">
                <Switch onChange={handleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
            </Form.Item>
            <Form.Item label='Hình ảnh'>
                <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                <br />
                <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type='submit' className='bg-blue-500 p-2 text-white'>Thêm phim</button>
            </Form.Item>
        </Form></div>
    )
}

export default AddNew