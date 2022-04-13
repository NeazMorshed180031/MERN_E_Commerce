import React, { useState } from "react";
import { Menu,Badge } from "antd";
import {
  SettingOutlined,
  WindowsOutlined,
  LoginOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import './search.css'
const { SubMenu, Item } = Menu;

const Header = () => {
  const dispatch = useDispatch();
  let { user,cart } = useSelector((state) => ({ ...state }));

  let history = useNavigate();

  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<WindowsOutlined />}>
        <Link to="/"> Home</Link>
      </Item>

      <Item key="shop" className="shops" icon={<ShoppingOutlined className="shops" />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" className="shops" icon={<ShoppingCartOutlined className="shops" />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9,0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<WindowsOutlined />} className="float-right">
          <Link to="/register"> </Link>
          Register
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login"></Link>
          Login
        </Item>
      )}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="pt-1 position ">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
