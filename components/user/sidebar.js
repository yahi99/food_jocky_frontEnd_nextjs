import React, {useEffect, useState} from 'react'
import { AiFillDashboard } from 'react-icons/ai';
import {CgProfile, CgShoppingCart} from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import Link from 'next/link';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import {Upload} from "antd";
import ImgCrop from "antd-img-crop";
import Swal from "sweetalert2";
import {fetchUser, uploadProfilePicture} from "../../app/slices/user/actions";
import Cookies from "js-cookie";
import {logoutUser} from "../../app/slices/user";

const Sidebar = () => {
    let dispatch = useDispatch()
    let router = useRouter()
    let user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.loaded && !user.auth) {
            router.push('/').then(() => {
            })
        }
    })

    const handleLogout = () => {
        Cookies.remove('fj_token')
        dispatch(logoutUser({}))
        router.push('/').then(() => {
        })
    }

    let image = null
    const onChange = async ({file: newFile}) => {
        setLoading(true)
        if(image === null) {
            image = newFile.originFileObj
            let {payload} = await dispatch(uploadProfilePicture({file: image}))
            if(payload.error) {
                await Swal.fire('Error', payload.msg, 'error')
            } else {
                await dispatch(fetchUser({}))
            }
            setLoading(false)
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined style={{fontSize: 32}}/> : <UserOutlined style={{fontSize: 44}} />}
        </div>
    );

    return (
        <>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="profile_sidebar_wrapper">
                    <div className="profile_details position-relative">
                        <ImgCrop aspect={1} rotate>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                onChange={onChange}
                            >
                                {(user.profile_picture && !loading) ? (
                                    <>
                                        <img src={user.profile_picture} alt="avatar" style={{ width: '100%' }} />
                                        <p className="browse-text">Browse</p>
                                    </>
                                ) : (
                                    <>
                                        {uploadButton}
                                        <p className="browse-text" style={{display: "block"}}>Browse</p>
                                    </>
                                )}

                            </Upload>
                        </ImgCrop>
                        <h3>{user.first_name + " " + user.last_name}</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="profiles_link">
                        <ul>
                            <NavLink href="/user">
                                <span><AiFillDashboard/>Dashboard</span>
                            </NavLink>
                            <NavLink href="/user/orders">
                                <span><CgShoppingCart /> Orders</span>
                            </NavLink>
                            <NavLink href="/user/profile">
                                <span><CgProfile /> Profile</span>
                            </NavLink>
                            <NavLink href="/user/delivery_address">
                                <span><BsWallet /> Delivery Address</span>
                            </NavLink>
                            <NavLink href="/user/wallet">
                                <span><BsWallet /> Wallet</span>
                            </NavLink>
                            <li>
                                <a onClick={handleLogout}><span><RiLogoutBoxRLine /> Logout</span></a>
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