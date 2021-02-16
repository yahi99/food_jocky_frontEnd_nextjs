import Head from "next/head";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../app/slices/user";
import Cookies from 'js-cookie'
import {Dropdown, Menu} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {useRouter} from "next/router";

const Header = () => {

    let user = useSelector(state => state.user)
    let dispatch = useDispatch()

    const handleLogout = () => {
        Cookies.remove('fj_token')
        dispatch(logoutUser({}))
    }

    let cart = useSelector(state => state.restaurant.cart)
    let count = 0
    if(cart.foods) {
        count = cart.foods.length
    }

    let overlayStyle = {
        minWidth: 150
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link href="/user">
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <a onClick={handleLogout}>Logout</a>
            </Menu.Item>
        </Menu>
     );

    return (
        <>
            <Head> 
                <title>Food Jocky</title>
            </Head>
            <nav className='navbar'>
                <div className='navbar-container container-fluid nav-area-padding'>
                    <Link href='/' className='navbar-logo'>
                        <a>
                            <img src='/assets/img/logo.gif' alt="logo"/>
                        </a>
                    </Link>

                    <ul className="nav-menu">
                        {user.last_order ? (
                            <li className='nav-item lan-area mr-1'>
                                <Link href='/checkout'>
                                    <a className='nav-links position-relative'>
                                        <span className="cart-count">1</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             stroke-linejoin="round" className="feather feather-shopping-bag">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                                        </svg>
                                    </a>
                                </Link>
                            </li>
                        ) : (
                            <li className='nav-item lan-area mr-1'>
                                <Link href='/cart'>
                                    <a className='nav-links position-relative'>
                                        <span className="cart-count">{count}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="feather feather-shopping-cart">
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                    </a>
                                </Link>
                            </li>
                        )}

                        <li>
                            {user.auth ? (

                                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" overlayStyle={overlayStyle} arrow>
                                    <a className="ant-dropdown-link mr-3" onClick={e => e.preventDefault()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="feather feather-user mr-1">
                                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                             <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <DownOutlined style={{fontSize: 13,fontWeight: 900}}/>
                                    </a>
                                </Dropdown>
                            ) : (
                                <Link href='/login'>
                                    <a className='nav-links' style={{marginLeft: 2}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="feather feather-user">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </a>
                                </Link>
                            )}
                        </li>
                        <li className='nav-item lan-area responsive-none'>
                            <a href='#' className="border-area active">
                                EN
                            </a>
                            <a href='#'>
                                BN
                            </a>
                        </li> 
                    </ul>

                  
                </div>
            </nav>
        </>
    )
}

export default Header
