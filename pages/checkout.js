import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import MainLayout from "../components/layout";
import {fetchOrder} from "../app/slices/order/actions";
import Pending from "../components/checkout/pending";
import Timeline from "../components/checkout/timeline";
import Thanks from "../components/checkout/thanks";
import NeedSupport from "../components/checkout/need_support";
import OrderDetails from "../components/checkout/order_details";
import {GraphqlProvider} from "../app/graphql";
import UpdateOrder from "../components/checkout/update_order";

const CheckOut = () => {
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    let order = useSelector(state => state.order)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded && user.loaded) {
            setLoaded(true)
            if(user.last_order) {
                dispatch(fetchOrder({id: user.last_order._id}))
            }
        }
    })

    if(! (user.loaded && order.loaded)) {
        return (
            <MainLayout>
                <div className="modal-body text-center">
                    <div className="loader"></div>
                    <div className="loader-txt">
                        <p>Loading</p>
                    </div>
                </div>
            </MainLayout>
        )
    }



    return (
        <MainLayout>
            <GraphqlProvider>
                <UpdateOrder id={order.data._id}/>
            </GraphqlProvider>
            <section id="Check_Out_Wrappers">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {order.data.status == "pending" && (
                                <Pending/>
                            )}
                            {(order.data.status == 'accepted' || order.data.status == 'delivered') && (
                                <Timeline order={order.data}/>
                            ) }

                            {order.status == "paid" && (
                                <Thanks/>
                            )}
                            <NeedSupport restaurant={order.data.restaurant}/>
                        </div>
                        <div className="col-lg-4">
                            <OrderDetails order={order.data}/>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
 }
 export default CheckOut

