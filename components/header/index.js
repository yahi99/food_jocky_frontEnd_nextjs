import Head from "next/head";
import React from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../app/slices/user/actions";
import {Dropdown} from "react-bootstrap";
import {logoutUser} from "../../app/slices/user";
import Cookies from 'js-cookie'

const Header = () => {
    let user = useSelector(state => state.user)
    let dispatch = useDispatch()
    if(user.loaded === false) {
        dispatch(fetchUser({}))
    }
    const handleLogout = () => {
        Cookies.remove('fj_token')
        dispatch(logoutUser({}))
    }

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
                        <li>
                            {user.auth ? (
                                <Dropdown className="mr-3 cursor-pointer">
                                    <Dropdown.Toggle as='span' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="feather feather-user">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>{user.first_name}</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
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
                        <li className='nav-item lan-area'>
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