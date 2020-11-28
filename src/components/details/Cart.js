import React from "react";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {addOrder} from "../restaurant/Restaurants";
import Link from "next/link";
import CartTable from "../Common/Cart/table";


const Cart = props => {

    if(! props.order.restaurant_name) {
        return <></>
    }

    if( props.order.orders.length < 1) {
        return <></>
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
                <CartTable order={props.order} setOrder={props.setOrder}/>
                <div className="Orders-Button">
                    <Link href='/cart'>
                        <a className="btn button-site">
                            Place Order
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Cart;
