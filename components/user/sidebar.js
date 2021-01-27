import React, {useState} from 'react'
const img1 = '/assets/img/profile.png'
import { AiFillDashboard } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import Link from 'next/link';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, Form, Upload, Button} from "antd";
import ImgCrop from "antd-img-crop";
import Swal from "sweetalert2";
import {fetchUser, uploadProfilePicture} from "../../app/slices/user/actions";

const Sidebar = () => {
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    const [loading, setLoading] = useState(false)
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