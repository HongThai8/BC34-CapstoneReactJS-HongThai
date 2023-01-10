import React, { Fragment, useEffect, useState } from 'react'
import { Route } from 'react-router'
import {
    DesktopOutlined,
    FileOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import './AdminTemplate.css'
import { NavLink } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import _ from 'lodash'
import { ACCESS_TOKEN, USER_LOGIN } from '../../util/settings/config';
import { useSelector } from 'react-redux';
import { history } from '../../App';



const { Header, Sider, Content } = Layout;


const AdminTemplate = (props) => {
    const { Component, ...restProps } = props
    const [collapsed, setCollapsed] = useState(false);
    const { userLogin } = useSelector(state => state.quanLyNguoiDungReducer)
    const onCollapse = collapsed => {
        // console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(() => {
        //scroll to top javascript
        window.scrollTo(0, 0)

    })

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment> <button onClick={() => {
            history.push('/profile')
        }}> <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="text-2xl ml-5 rounded-full bg-red-200">{userLogin.taiKhoan.substr(0, 1)}</div>Hello! <span className='text-blue-500'>{userLogin.taiKhoan}</span></button> <button onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESS_TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="text-blue-800">Đăng xuất</button> </Fragment> : ''}
    </Fragment>


    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
                            <Menu.Item key="8" icon={<UserOutlined />}>
                                <NavLink to="/admin/users">Users</NavLink>

                            </Menu.Item>
                            <Menu.Item key="9" icon={<FileOutlined />}>
                                <NavLink to="/admin/users/adduser">Add user</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="10" icon={<FileOutlined />}>
                                <NavLink to="/admin/films">Films</NavLink>

                            </Menu.Item>
                            <Menu.Item key="11" icon={<FileOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new</NavLink>


                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="99" icon={<HomeOutlined />}>
                            <NavLink to="/home">Back to home</NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/films/showtime">Showtime</NavLink>

                        </Menu.Item> */}
                        {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="text-right pr-10 pt-1">{operations}</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: '85vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>
        </Fragment>
    }} />
}

export default AdminTemplate

