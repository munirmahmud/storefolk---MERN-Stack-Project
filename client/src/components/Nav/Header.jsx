import { HomeOutlined, LogoutOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import firebase from 'firebase';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const [current, setCurrent] = useState("home");
    const dispatch = useDispatch();
    const {user} = useSelector(state => ({ ...state }));
    const history = useHistory();

    const { SubMenu, Item } = Menu;

    // Select the active menu
    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logOut = () => {
        firebase.auth().signOut().then(() => {
            toast.success("You successfully logged out");
        }).catch((error) => {
            toast.error(error.message);
        });

        dispatch({
            type: "LOGOUT",
            payload: null,
        });

        history.push('/');
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            {!user && (
                <>
                    <Item key="register" icon={<UserAddOutlined />} className="float-right">
                        <Link to="/register">Register</Link>
                    </Item>
                    <Item key="login" icon={<UserOutlined />} className="float-right">
                        <Link to="/login">Login</Link>
                    </Item>
                </>
            )}

            {/* Drop down menu */}
            {user && (
                <>
                    <SubMenu key="user" icon={<UserOutlined />} className="float-right" title={user?.email && user.email.split('@')[0]}>

                        {user && user?.role === 'subscriber' && (
                            <Item key="dashboard">
                                <Link to="/user/history">Dashboard</Link>
                            </Item>
                        )}
                        {user && user?.role === 'admin' && (
                            <Item key="dashboard">
                                <Link to="/admin/dashboard">Dashboard</Link>
                            </Item>
                        )}
                        
                        <Item key="logout" icon={<LogoutOutlined />} onClick={logOut}>Logout</Item>
                    </SubMenu>
                </>
            )}
        </Menu>
    );
};

export default Header;
