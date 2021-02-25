import React, {useEffect, useState} from "react";
import MainLayout from "../components/layout";
import Cart_Heading from "../src/components/Cart/Cart_Heading";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import CartTable from "../components/cart/table";
import {useRouter} from "next/router";
import DeliveryAddresses from "../components/cart/delivery_addresses";
import {fetchDeliveryAddresses, getDistance, placeOrder} from "../app/slices/order/actions";
import Payment_Area from "../src/components/Cart/Payment_Area";
import Swal from "sweetalert2";
import {fetchUser, fetchWallet} from "../app/slices/user/actions";
import {clearCart} from "../app/slices/restaurant";
import {fetchRestaurant} from "../app/slices/restaurant/actions";
import Cookies from "js-cookie";

const Cart = () => {
    let dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const [selected, setSelected] = useState();
    const [payment, setPayment] = useState('cod');
    let router = useRouter()
    let cart = useSelector(state => state.restaurant.cart)
    let user = useSelector(state => state.user)
    let settings = useSelector(state => state.order.settings)
    let distance = useSelector(state => state.order.distance)
    let restaurant = useSelector(state => {
        return {
            address: state.restaurant.restaurant.data.address,
            discount: state.restaurant.restaurant.data.discount_given_by_restaurant + state.restaurant.restaurant.data.discount_given_by_admin,
        }
    })
    useEffect(() => {
        if (!loaded && cart.restaurant_id) {
            setLoaded(true)
            dispatch(fetchDeliveryAddresses({}))
            dispatch(fetchWallet(({})))
            dispatch(fetchRestaurant({id: cart.restaurant_id}))
        }
    })

    const handleSelected = value => {
        Cookies.set('delivery_to', value.address.location)
        let delivery_to = value.address.location
        setSelected(value)
        dispatch(getDistance({
            lat1: restaurant.address.location.lat,
            lng1: restaurant.address.location.lng,
            lat2: delivery_to.lat,
            lng2: delivery_to.lng
        }))
    }

    const handleSubmit = async () => {
        if (!selected) {
            await Swal.fire('Warning', 'Please select delivery address', 'warning')
        } else {
            let total = 0
            let items = cart.foods.map(order => {
                total += order.quantity * order.price
                return {
                    _id: order._id,
                    category_id: order.category_id,
                    name: order.name,
                    price: order.price,
                    quantity: order.quantity,
                    size: order.size
                }
            })
            let delivery_charge = settings.rider_cost * distance
            let customer_discount_amount = (total * 0.01 * restaurant.discount)
            let vat = (total * 0.01 * settings.customer_vat)
            let order = {
                delivery_charge,
                customer_discount_amount,
                vat,
                sub_total: total,
                total: total + delivery_charge + vat - customer_discount_amount,
                restaurant: cart.restaurant_id,
                payment_type: payment,
                items: items,
                delivery_info: {
                    _id: selected._id,
                    title: selected.title,
                    address: {
                        address: selected.address.address,
                        location: {
                            lat: selected.address.location.lat,
                            lng: selected.address.location.lng
                        }
                    },
                    reciver_mobile_no: selected.reciver_mobile_no,
                    reciver_name: selected.reciver_name,
                    house_no: selected.house_no,
                    floor_no: selected.floor_no,
                    note_to_rider: selected.note_to_rider
                }
            }

            if (payment === 'wallet' && user.wallet.balance < order.total) {
                await Swal.fire({
                    title:'Warning',
                    text: 'You don\'t have much balance in your wallet',
                    icon: 'warning',
                    footer: '<a href="/user/wallet" class="text-primary font-weight-bolder">Go to Wallet</a>'
                })
            } else {
                let {payload} = await dispatch(placeOrder({order}))
                if (payload.error) {
                    await Swal.fire('Error', payload.msg, 'error')
                } else {
                    await Swal.fire('Success', 'Order placed Successfully', 'success')
                    await dispatch(fetchUser({}))
                    dispatch(clearCart({}))
                    await router.push('/checkout')
                }
            }

        }
    }

    if (user.last_order) {
        return (
            <MainLayout>
                <div className="flex text-center cart_area_main">
                    <h2>You have a previous order</h2>
                    <Link href="/checkout">
                        <a className="btn button-site" type="button">Show Order</a>
                    </Link>
                </div>
            </MainLayout>
        )
    }


    if (!cart.foods) {
        return (
            <MainLayout>
                <div className="flex text-center  cart_area_main">
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

                            <Payment_Area payment={payment} setPayment={setPayment}/> 
                            <div className="Orders-Button" style={{float: 'right', marginTop: 20}}>
                                <a className="btn button-site" onClick={handleSubmit}>
                                    Place Order
                                </a>
                            </div>
                        </>
                    ) : (
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