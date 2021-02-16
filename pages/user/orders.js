import MainLayout from "../../components/layout";
import React, {useEffect, useState} from "react";
import Sidebar from "../../components/user/sidebar";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchDashboardData} from "../../app/slices/user/actions";
import {GrView} from "react-icons/gr";
import {Modal, Table} from "antd";

const Orders = () => {
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
            title: 'Amount',
            dataIndex: 'total',
            className: 'text-center',
            render: amount => amount && amount.toFixed(2)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: 'text-center',
            key: 'status',
            render: (status, record) => {
                if(status === 'pending')
                    return <span className="btn btn-warning btn-sm shadow-none rounded"> Pending </span>
                if(status === 'completed')
                    return <span className="btn btn-primary btn-sm shadow-none"> Completing </span>
                if(status === 'paid')
                    return <span className="btn btn-success btn-sm shadow-none"> Completed </span>
                if(status === 'cancelled')
                    return <span className="btn btn-danger btn-sm shadow-none"> Cancelled </span>

                return <></>
            }
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
                            <h3>My Orders</h3>
                            <div>
                                <Modal title="Order Details" visible={show} onOk={() => setShow(false)}
                                       onCancel={() => setShow(false)} footer={null}>
                                    <ModalData order={current}/>
                                </Modal>

                                <div className="data_tables" style={{maxWidth: '100vw', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 24}}>
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

export default Orders


const ModalData = ({order}) => {
    if (!order)
        return <></>

    let dateFormat = require('dateformat');
    let date = new Date(+order.createdAt)
    return (
        <>
            <h5 className="ml-3 font-weight-bold"><span className="font-weight-normal">Restaurant Name : </span> {order.restaurant.name}</h5>
            <h6 className="ml-3 mb-3 font-weight-bold"><span className="font-weight-normal">Order Time : </span> {dateFormat( date, "dd mmm, yyyy, h:MM TT")}</h6>
            <div className="px-3">
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-right">Total Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-right">{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <hr className="mt-0 mb-2 p-0"/>
            <div className="row mr-3">
                <div className="ml-auto col-md-8">
                    <p className="mb-1">Subtotal: <b className="float-right"> {order.sub_total.toFixed(2)} </b></p>
                    <p className="mb-1 text-danger">Discount: <b className="float-right"> { (order.total - (order.sub_total + order.delivery_charge + order.vat)).toFixed(2)} </b></p>
                    <p className="mb-1">Delivery Charge: <b className="float-right"> { order.delivery_charge.toFixed(2) } </b></p>
                    <p className="mb-1">Vat: <b className="float-right"> {order.vat && order.vat.toFixed(2)} </b></p>
                    <hr className="mt-0 mb-2 p-0"/>
                    <p className="mb-1">Total: <b className="float-right"> {order.total.toFixed(2)} </b></p>
                </div>
            </div>
        </>
    )
}