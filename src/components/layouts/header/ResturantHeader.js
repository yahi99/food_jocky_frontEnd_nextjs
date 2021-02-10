import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import {Dropdown} from "react-bootstrap";
import Router from "next/router";
import Head from "next/head";

function RestaurantHeader(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    function handleLogout(e) {
        e.preventDefault();
        const Cookies = require('js-cookie');
        Cookies.remove('token');
        Router.push("/restaurant_login");
    }

    useEffect(() => { 
        showButton();
    }, []);

//  window.addEventListener('resize', showButton);
    return (
        <>
            <Head>
                <title>Food Jocky</title>
            </Head>
            <nav className='navbar'>
                <div className='navbar-container container'>
                    <Link href='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <a>
                            <img src='/assets/img/logo.gif' alt="logo" />
                        </a>
                    </Link>

                    <div className='menu-icon' onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link href='/'>
                                <a className='nav-links' onClick={closeMobileMenu}>Home</a>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link href='/add_food'>
                                <a className='nav-links' onClick={closeMobileMenu}>Add Food</a>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Dropdown>
                                <Dropdown.Toggle as='span' >
                                    <svg className="svg-icon" viewBox="0 0 20 20" width="20px" fill="none" stroke="currentColor" strokeWidth="1">
                                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z">
                                        </path>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/*<Dropdown.Item>{props.restaurantName}</Dropdown.Item>*/}
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className='nav-item'>
                            <Link href='#'>
                                <a className='nav-links' onClick={closeMobileMenu}><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                    </path>
                                </svg></a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default RestaurantHeader;
