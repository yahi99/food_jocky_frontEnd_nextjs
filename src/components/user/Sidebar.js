import React from 'react'
const img1 = '/assets/img/profile.png'
import { AiFillDashboard } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import Link from 'next/link';

const Sidebar = () => {
 return (
  <>
    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
      <div className="profile_sidebar_wrapper">
        <div className="profile_details">
         <img src={img1} alt="" />
         <h3>Surya Aysha</h3>
         <p>Surya999@gmail.com</p>
        </div>
        <div className="profiles_link">
          <ul>
           <li>
            <Link href="/user/dashBoard">
             <a className="active"><AiFillDashboard/>Dashboard</a>
             </Link> 
            </li>
           <li>
            <Link href="/user/profile">
             <a><CgProfile /> Profile</a>
             </Link>
             </li>
           <li>
            <Link href="/user/wallet">
             <a><BsWallet /> Wallet</a>
             </Link>
             </li>
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
