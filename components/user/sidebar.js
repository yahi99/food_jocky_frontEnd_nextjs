import React from 'react'
const img1 = '/assets/img/profile.png'
import { AiFillDashboard } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import Link from 'next/link';
import {useRouter} from "next/router";

const Sidebar = () => {
    return (
        <>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="profile_sidebar_wrapper">
                    <div className="profile_detsils">
                        <img src={img1} alt="" />
                        <h3>Surya Aysha</h3>
                        <p>Surya999@gmail.com</p>
                    </div>
                    <div className="profiles_link">
                        <ul>
                            <NavLink href="/user">
                                <span><AiFillDashboard/>Dashboard</span>
                            </NavLink>
                            <NavLink href="/user/profile">
                                <span><CgProfile /> Profile</span>
                            </NavLink>
                            <NavLink href="/user/wallet">
                                <span><BsWallet /> Wallet</span>
                            </NavLink>
                            <li>
                                <Link href="/">
                                    <a><RiLogoutBoxRLine /> Logout</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar


const NavLink = ({href = '#!', children}) => {
    let router = useRouter()
    return (
        <li>
            <Link href={href}>
                <a className={href === router.pathname ? 'active': ''}>{children}</a>
            </Link>
        </li>
    )
}