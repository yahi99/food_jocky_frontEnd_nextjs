import React, {useState} from 'react'
import Order_details from './order_details'
import NeedSupport from './NeedSupport'
import Thanks from './Thanks'
import Timeline from './Timeline'
import Pending from "./pending";
import Cookies from 'js-cookie';
import UpdateOrder from "./UpdateOrder";
import UrqlProvider from "../urql/urql-provider";


const Checkout = props => {
    const [order, setOrder] = useState(props.order)

    return (
        <>
            <UrqlProvider token={Cookies.get('token')}>
                <UpdateOrder setOrder={setOrder} id={order._id}/>
            </UrqlProvider>

            <section id="Check_Out_Wrappers">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {order.status == "pending" && (
                                <Pending/>
                            )}
                            {(order.status == 'accepted' || order.status == 'delivered') && (
                                  <Timeline order={order}/>
                            ) }

                            {order.status == "paid" && (
                                <Thanks/>
                            )}
                            <NeedSupport/>
                        </div>
                        <div className="col-lg-4">
                            <Order_details order={order}/>
                            <div className="card mt-3" style={{padding: 20}}>
                                <h4 className="mt-2 font-weight-normal">Delivery Pin: <span style={{color: '#d30807'}}>{props.order.pin}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
 }

 export default Checkout