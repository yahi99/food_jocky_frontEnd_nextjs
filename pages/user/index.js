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
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";

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
                            <div>
                                <Modal title="Order Details" visible={show} onOk={() => setShow(false)}
                                       onCancel={() => setShow(false)} footer={null}>
                                    <ModalData order={current}/>
                                </Modal>

                                <div style={{maxWidth: '100vw', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 24}}>
                                    <Table columns={columns} pagination={{pageSize: 5}} dataSource={data} >
                                    </Table>
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

const ModalData = ({order}) => {
    if (!order)
        return <></>

    let dateFormat = require('dateformat');
    let date = new Date(+order.createdAt)
    return (
        <>
            <h5 className="ml-3 font-weight-bold"><span className="font-weight-normal">Restaurant Name : </span> {order.restaurant.name}</h5>
            <h6 className="ml-3 mb-3 font-weight-bold"><span className="font-weight-normal">Order Time : </span> {dateFormat( date, "dd mmm, yyyy, h:MM TT")}</h6>
            <div className="food_cart_wrapper">
                <div className="food_cart_items">
                    <div className="food_names">
                        <h3>Item Name </h3>
                    </div>
                    <div className="food_count_price">
                        <p className="font-weight-bold">Quantity</p>
                    </div>

                    <div className="food_count_total_price">
                        <p className="font-weight-bold">Price</p>
                    </div>
                </div>
                {order.items.map((order, index) => (
                    <div className="food_cart_items" key={index}>
                        <div className="food_names" style={{width: '50%'}}>
                            <h3>{order.name} </h3>
                            <p>{order.size}</p>
                        </div>
                        <div className="food_count_price font-weight-normal block text-right" style={{width: '20%'}}>
                            {order.quantity}
                        </div>

                        <div className="food_count_total_price" style={{width: '30%'}}>
                            <p>Tk. {order.price * order.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>


            <div className="Food_vat_area">
                <div className="vat-inner-area">
                    <h6>Food Price</h6>
                    <p>Tk. {order.total}</p>
                </div>
                <div className="vat-inner-area">
                    <h6>VAT</h6>
                    <p>Tk. 0</p>
                </div>
                <div className="vat-inner-area">
                    <h6>Delivery Fee</h6>
                    <p>Tk. {order.delivery_charge}</p>
                </div>
            </div>
            <div className="Total_Areas">
                <h3>Total</h3>
                <h3>Tk. {order.total}</h3>
            </div>
        </>
    )
}