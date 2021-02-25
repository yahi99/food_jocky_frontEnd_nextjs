import Head from "next/head";
import React, {useEffect, useState, useRef} from 'react'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/slices/user";
import Cookies from "js-cookie";
import { Dropdown, Menu } from "antd";
import { BsBell } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import CartTable from "../cart/table";

const Header = ({ restaurant }) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const toggle = () => {
    router.pathname === '/cart' || setShow(!show)
  }
  const ref = useRef()
  const handleClickOutside = (e) => {
      if (ref && !ref.current.contains(e.target)) {
          setShow(false)
      } 
  }
  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      }
  })

  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("fj_token");
    dispatch(logoutUser({}));
  };

  let cart = useSelector((state) => state.restaurant.cart);
  let count = 0;
  if (cart.foods) {
    count = cart.foods.length;
  }

  let overlayStyle = {
    minWidth: 150,
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/user">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3"> 
        <a onClick={handleLogout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  const CartMenu = (
    <div id="area_ant_dropdown" ref={ref} style={{display: show ? 'block': 'none'}}>
      {count > 0 ? (
        <div className="menu_cart_area">
          <h6 className="menu_titles">Your order</h6>
          <p>Tamima Ranagor</p>
          <div className="Cart_area_wrappers">
            <div className="Cart_top_area">
              <h4>{cart.restaurant_name}</h4>
              <h5>{cart.foods.length} Items Added</h5>
            </div>
            <CartTable cart={cart} />
            <div className="Orders-Button">
              <Link href="/cart">
                <a className="btn button-site"> Place Order</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty_cart_area">
          <h3>Your bag is empty.</h3>
          <img src="./assets/img/empty_cart.png" alt="img" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Food Jocky</title>
      </Head>
      <nav className="navbar">
        <div className="navbar-container container-fluid nav-area-padding">
          <Link href="/" className="navbar-logo">
            <a>
              <img src="/assets/img/logo.gif" alt="logo" />
            </a>
          </Link>

          <ul className="nav-menu area_menus">
            <li>
              {user.auth ? (
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomRight"
                  overlayStyle={overlayStyle}
                  arrow
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="area_saying">Hi, </span>
                    <span className="user_names">Hadayet</span>
                    <BsChevronDown
                      style={{ fontSize: 13, fontWeight: 900, marginLeft: 5,
                    marginRight:15 }}
                    />
                  </a>
                </Dropdown>
              ) : (
                <Link href="/login">
                  <a className="nav-links" style={{ marginLeft: 2, fontSize:15, fontWeight:500 }}>
                    Sign In
                  </a>
                </Link>
              )}
            </li>
            <li>
              <Link href="/notification" className="navbar-logo">
                <a className="nav-links">
                  <BsBell />
                </a>
              </Link>
            </li>
            {user.last_order ? (
              <li className="nav-item lan-area mr-1">
                <Link href="/checkout">
                  <a className="nav-links position-relative">
                    <span className="cart-count">1</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      className="feather feather-shopping-bag"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </a>
                </Link>
              </li>
            ) : (
              <li className="nav-item lan-area mr-1">
                <div className="position-relative">
                  <a
                    className="nav-links  position-relative"
                    onClick={toggle}
                  >
                    <span className="cart-count">{count}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </a>
                  {CartMenu}
                  </div>
              </li>
            )}
            <li className="nav-item lan-area responsive-none">
              <a href="#" className="border-area active">
                EN
              </a>
              <a href="#">BN</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
