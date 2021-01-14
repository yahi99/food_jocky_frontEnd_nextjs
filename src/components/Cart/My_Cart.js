import React from 'react'
import Cart_Heading from './Cart_Heading'
import Cart_Card from './Cart_Card'
import Link from "next/link";
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import CartTable from "../Common/Cart/table";

const My_Cart = props => {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="Cart-Area-Heading-top">
                        <Cart_Heading heading='My Cart' />
                        <span>({props.order.orders ? props.order.orders.length : '0'} Items)</span>
                    </div>
                    <div className="restaurant_thumd_area">
                        <div className="res_thumd_img">
                            <img src="/assets/img/thumb.jpg" alt="logo" />
                        </div>
                        <div className="thumb_name_details">
                        <p>Ordered From</p>
                            <h6><Link href={"/details?id=" + props.order.restaurant_id}>{props.order.restaurant_name || ''}</Link></h6>
                        </div>
                    </div>
                    <div className="Cart_Top_Card">
                       <CartTable order={props.order} setOrder={props.setOrder} delivery_charge={props.delivery_charge}/>
                        <div className="pro_code_area">
                            <h3>Promo Code</h3>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Your Promo Code" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn button-site" type="button">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default My_Cart
