import React, {useEffect, useState} from "react";
import MainLayout from "../components/layout";
import Cart_Heading from "../src/components/Cart/Cart_Heading";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import CartTable from "../components/cart/table";
import {useRouter} from "next/router";
import AdditionalItems from "../components/cart/additional_items";
import DeliveryAddresses from "../components/cart/delivery_addresses";
import {fetchDeliveryAddresses, getDistance, placeOrder} from "../app/slices/order/actions";
import Payment_Area from "../src/components/Cart/Payment_Area";
import Swal from "sweetalert2";
import {fetchUser} from "../app/slices/user/actions";
import {clearCart} from "../app/slices/restaurant";
import {fetchRestaurant} from "../app/slices/restaurant/actions";

const Cart = () => {
    let dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [selected , setSelected ] = useState();
    let router = useRouter()
    let cart = useSelector(state => state.restaurant.cart)
    let user = useSelector(state => state.user)
    let delivery_charge = useSelector(state => state.order.delivery_charge)
    let restaurant_address = useSelector(state => state.restaurant.restaurant.data.address)
    useEffect(() => {
        if(!loaded && cart.restaurant_id) {
            setLoaded(true)
            dispatch(fetchDeliveryAddresses({}))
            dispatch(fetchRestaurant({id: cart.restaurant_id}))
        }
    })

    const handleSelected = value => {
        let delivery_to = value.address.location
        setSelected(value)
        dispatch(getDistance({lat1: restaurant_address.location.lat, lng1: restaurant_address.location.lng, lat2: delivery_to.lat, lng2: delivery_to.lng}))
    }

    const handleSubmit = async () => {
        if(!selected) {
            await Swal.fire('Warning', 'Please select delivery address', 'warning')
        } else {
            let {payload} = await dispatch(placeOrder({cart, delivery_address: selected, delivery_charge}))
            if(payload.error) {
                await Swal.fire('Error', payload.msg, 'error')
            } else {
                await Swal.fire('Success', 'Order placed Successfully')
                await dispatch(fetchUser({}))
                dispatch(clearCart({}))
                await router.push('/checkout')
            }
        }


    }

    if(user.last_order) {
        return (
            <MainLayout>
                <div className="flex text-center" style={{height: '50vh', padding: '20vh'}}>
                    <h2>You have a previous order</h2>
                    <Link href="/checkout">
                        <a className="btn button-site" type="button">Show Order</a>
                    </Link>
                </div>
            </MainLayout>
        )
    }


    if(!cart.foods) {
        return (
            <MainLayout>
                <div className="flex text-center" style={{height: '50vh', padding: '20vh'}}>
                    <h2>Your Cart is Empty</h2>
                    <Link href="/">
                        <a className="btn button-site" type="button">Add Foods</a>
                    </Link>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <section id="My_Cart_Wrappers_Area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="Cart-Area-Heading-top">
                                <Cart_Heading heading='My Cart'/>
                                <span>({cart.foods ? cart.foods.length : '0'} Items)</span>
                            </div>
                            <div className="restaurant_thumd_area">
                                <div className="res_thumd_img">
                                    <img src="/assets/img/thumb.jpg" alt="logo"/>
                                </div>
                                <div className="thumb_name_details">
                                    <p>Ordered From</p>
                                    <h6><Link
                                        href={"/restaurant?id=" + cart.restaurant_id}>{cart.restaurant_name || ''}</Link>
                                    </h6>
                                </div>
                            </div>
                            <div className="Cart_Top_Card">
                                {cart.foods && (
                                    <CartTable cart={cart}/>
                                )}

                                <div className="pro_code_area">
                                    <h3>Promo Code</h3>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Enter Your Promo Code"
                                               aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn button-site" type="button">Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {user.auth ? (
                        <>
                            <div className="row">
                                <div className="col-lg-12">
                                    <DeliveryAddresses selected={selected} setSelected={handleSelected}/>
                                </div>
                            </div>

                            <Payment_Area/>
                            <div className="Orders-Button" style={{ float: 'right',marginTop: 20}}>
                                <a className="btn button-site" onClick={handleSubmit}>
                                    Place Order
                                </a>
                            </div>
                        </>
                    ): (
                        <div className="flex text-center" style={{height: '40vh', padding: '20vh'}}>
                            <h2>You are not logged in!</h2>
                            <Link href="/login">
                                <a className="btn button-site" type="button">Login</a>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    )
}

export default Cart;
