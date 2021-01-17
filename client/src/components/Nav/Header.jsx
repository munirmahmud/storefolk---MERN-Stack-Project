import { HomeOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [current, setCurrent] = useState("home");

    const { SubMenu, Item } = Menu;

    // Select the active menu
    const handleClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>

            {/* Drop down menu */}
            <SubMenu key="user" icon={<UserOutlined />} title="Munir Mahmud">
                <Item key="dashboard">Dashboard</Item>
                <Item key="history">History</Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;
