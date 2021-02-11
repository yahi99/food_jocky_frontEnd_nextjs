import MainLayout from "../../components/layout";
import React, {useEffect, useState} from "react";
import Sidebar from "../../components/user/sidebar";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchDashboardData} from "../../app/slices/user/actions";
import {BsBagFill} from "react-icons/bs";
import {FiRefreshCw} from "react-icons/fi";
import {GrView} from "react-icons/gr";
import {Modal, Table} from "antd";

const User = () => {
    let router = useRouter()
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    const [loaded, setLoaded] = useState(false)
    const [show, setShow] = useState(false)
    const [current, setCurrent] = useState()

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            dispatch(fetchDashboardData(({})))
        }
    })
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Payment Method',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                if(status === 'pending')
                    return <span className="btn btn-warning btn-sm shadow-none rounded"> Pending </span>
                if(status === 'completed')
                    return <span className="btn btn-primary btn-sm shadow-none"> Cancelled </span>
                if(status === 'cancelled')
                    return <span className="btn btn-danger btn-sm shadow-none"> Cancelled </span>

                return <></>
            }
        },
        {
            title: 'Amount',
            dataIndex: 'total',
            className: 'text-center',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            className: "text-center",
            render: (_, record) => {
                return <GrView className="cursor-pointer" onClick={e => handleShow(record)}/>
            }
        }
    ];

    let data = []
    if (user.dashboard.loaded) {
        data = user.dashboard.orders.map((order, index) => {
            return {
                key: index + 1,
                method: 'COD',
                ...order
            }
        })
    }

    const handleShow = order => {
        setCurrent(order)
        setShow(true)
    }

    return (
        <MainLayout>
            <section id="dashboard_wrappers">
                <div className="container">
                    <div className="row">
                        <Sidebar/>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                            <div className="dashboard_wrappers_area">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <DashboardCard title="Total Orders" value={user.dashboard.totalOrders}
                                                       icon={<BsBagFill/>}/>
                                    </div>
                                    <div className="col-lg-6">
                                        <DashboardCard title="Pending Orders" value={user.dashboard.pendingOrders}
                                                       icon={<FiRefreshCw/>}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </MainLayout>
    )
}

export default User


const DashboardCard = ({title, value, icon}) => {
    return (
        <div className="dashboard_top_box">
            <div className="dashboard_top_icon">
                {icon}
            </div>
            <div className="dashboard_top_text">
                <h3>{title}</h3>
                <p>{value}</p>
            </div>
        </div>
    )
}
