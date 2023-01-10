import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { AppleOutlined, FacebookOutlined } from '@ant-design/icons'

const Footer = (props) => {
    const { heThongRapChieu } = useSelector(state => state.quanLyRapReducer)
    // console.log("heThongRapChieu: ", heThongRapChieu);
    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']))

    // console.log("arrHeThongRap: ", arrHeThongRap);
    return (
        <div className=''>
            <footer className="py-6 text-gray-100 bg-gray-900">
                <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                    <div className="grid grid-cols-12">
                        <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                            <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 md:justify-start">
                                <div className="flex items-center justify-center w-36 h-36 rounded-full">
                                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt='logo' />
                                </div>
                            </a>
                        </div>
                        <div className="col-span-6 text-center md:text-left md:col-span-3">
                            <p className="pb-1 text-lg font-medium">PARTNER</p>
                            <div style={{ color: '#ffffff' }} className='grid grid-cols-3 gap-2'>
                                {arrHeThongRap.map((htr, index) => {
                                    return <div key={index}>
                                        <img style={{ width: '50px' }} src={htr.logo} alt="logo" className='w-full' />
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="col-span-6 text-center md:text-left md:col-span-3">
                            <p className="pb-1 text-lg font-medium">Mobile App</p>
                            <div className="flex text-white">
                                <div className="mr-5">
                                    <AppleOutlined className="text-2xl" />
                                </div>
                                <div>
                                    <FacebookOutlined className="text-2xl" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="grid justify-center pt-6 lg:justify-between">
                        <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                            <span>©2022 All rights reserved</span>
                        </div>
                        <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer