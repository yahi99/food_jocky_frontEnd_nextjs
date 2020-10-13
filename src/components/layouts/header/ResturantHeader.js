import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function RestaurantHeader() {
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

    useEffect(() => {
        showButton();
    }, []);

//  window.addEventListener('resize', showButton);
    return (
        <>

            <nav className='navbar'>
                <div className='navbar-container container'>
                    <Link href='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <img src='/assets/img/logo.png' alt="logo" />
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
                            <Link href='/restaurant_login'>
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
