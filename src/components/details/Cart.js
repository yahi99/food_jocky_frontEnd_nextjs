import React from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import CartTable from "../Common/Cart/table";
import {useRouter} from "next/router";


const Cart = props => {

    let router = useRouter();
    const goOrder = e => {
        router.push('/check_out');
    }
    const goLogin = e => {
        router.push('/login');
    }

    if(! props.order.restaurant_name) {
        return <></>
    }

    if( props.order.orders.length < 1) {
        return <></>
    }

    let auth = props.user.authenticated;
    let orderAble = auth && ( props.user.user.last_order && ( props.user.user.last_order.status == 'paid' ||  props.user.user.last_order.status == 'cancelled'))
    if( props.user.user && !props.user.user.last_order) {
        orderAble = true
    }

    return (
        <>
            <div className="Catr-Heading">
                <h2>My Cart</h2>
            </div>
            <div className="Cart_area_wrappers">
                <div className="Cart_top_area">
                    <h4>{props.order.restaurant_name}</h4>
                    <h5>{props.order.orders.length} Items Added</h5>
                </div>
                <CartTable order={props.order} setOrder={props.setOrder} delivery_charge={props.settings.delivery_charge || 0}/>
                <div className="Orders-Button">
                    {auth && orderAble && (
                        <Link href='/cart'>
                            <a className="btn button-site">
                                Place Order
                            </a>
                        </Link>
                    )}
                    {auth && ! orderAble && (
                        <a className="btn button-site" onClick={()=> Swal.fire('Warning', "You have a previous order", 'warning').then(goOrder)}>
                            Place Order
                        </a>
                    )}

                    { ! auth && (
                        <a className="btn button-site" onClick={()=> Swal.fire('Warning', "Please log in to place order", 'warning').then(goLogin)}>
                            Place Order
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
