import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import {Dropdown} from "react-bootstrap";
import {useRouter} from "next/router";
import Head from "next/head";

function Header(props) {
 const [click, setClick] = useState(false);
 const [button, setButton] = useState(true);
    let Router = useRouter();

 const handleClick = () => setClick(!click);
 const closeMobileMenu = () => setClick(false);

    function handleLogout(e) {
        e.preventDefault();
        const Cookies = require('js-cookie');
        Cookies.remove('token');
        Router.push("/");
    }

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
      <Head>
          <title>Food Jocky</title>
      </Head>

        <nav className='navbar'>
          <div className='navbar-container container-fluid nav-area-padding'>
            <Link href='/' className='navbar-logo' onClick={closeMobileMenu}>
                <a>
                    <img src='/assets/img/logo.gif' alt="logo" />
                </a>
            </Link>

            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {/* <li className='nav-item'>
                <Link href='/'>
                 <a className='nav-links' onClick={closeMobileMenu}>Home</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='#'>
                 <a className='nav-links' onClick={closeMobileMenu}>About</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/'>
                 <a className='nav-links' onClick={closeMobileMenu}>Search</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='#'>
                  <a className='nav-links' onClick={closeMobileMenu}>FAQ</a>
                </Link>
              </li> */}
                <li className='nav-item lan-area'>
                    <Link href='/cart'>
                        <a className='nav-links' onClick={closeMobileMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="feather feather-shopping-cart">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </a>
                    </Link>
                </li>


              <li className='nav-item'>
                  {props.user && props.user.authenticated ? (
                      <Dropdown>
                          <Dropdown.Toggle as='span' >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                   stroke-linejoin="round" className="feather feather-user">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                              </svg>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                              <Dropdown.Item>{props.user.user.first_name}</Dropdown.Item>
                              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  ) : (
                      <Link href='/login'>
                          <a className='nav-links' onClick={closeMobileMenu}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                   stroke-linejoin="round" className="feather feather-user">
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

export default Header;
