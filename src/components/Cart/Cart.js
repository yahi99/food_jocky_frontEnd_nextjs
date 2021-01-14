import React, {useState} from 'react'
import My_Cart from './My_Cart'
import Additional_Items_Select_Delivery from './Additional_Items_Select_Delivery'
import Payment_Area from './Payment_Area'
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {addOrder} from "../restaurant/Restaurants";
import Swal from "sweetalert2";

const Cart = props => {
    const router = useRouter();

    const [ order, setOrder ] = useState(JSON.parse(Cookies.get('my_order') || "{}"));
    const [ location, setLocation ] = useState(null);

    let delivery_charge = props.user.user.delivery_charge || 0



    const handlePlaceOrder = async e => {


        if(props.user.authenticated) {
            if( ! location ) {
                Swal.fire('Warning', 'Please select delivery address', 'warning')
            } else {
                if( order.restaurant_id && order.orders.length > 0 ) {
                    let total = 0
                    order.orders.forEach(order => {
                        total += order.quantity * order.price
                    })


                    let items = order.orders.map(order => {
                        return {
                            _id: order.food_id,
                            category_id: order.category_id,
                            name: order.food_name,
                            price: order.price,
                            quantity: order.quantity,
                            size: order.size
                        }
                    })
                    let newOrder = {
                        delivery_charge: delivery_charge,
                        sub_total: total,
                        total: total + delivery_charge,
                        restaurant: order.restaurant_id,
                        items: items,
                        delivery_info: {
                            _id: location._id,
                            title: location.title,
                            address: {
                                address: location.address.address,
                                location: {
                                    lat: location.address.location.lat,
                                    lng: location.address.location.lng
                                }
                            },
                            reciver_mobile_no: location.reciver_mobile_no,
                            reciver_name: location.reciver_name,
                            house_no: location.house_no,
                            floor_no: location.floor_no,
                            note_to_rider: location.note_to_rider
                        }
                    }
                    let result = await addOrder(newOrder);
                    if(result.error) {
                        Swal.fire(
                            'Error',
                            result.msg,
                            'error'
                        )
                    } else {
                        Cookies.set('my_order', {});
                        setOrder(JSON.parse(Cookies.get('my_order')))
                        Swal.fire(
                            'Success',
                            'Order Placed Successfully',
                            'success'
                        ).then(result => {
                            router.push('/check_out')
                        })

                    }
                } else {
                    Swal.fire('Warning', 'Cart is empty', 'warning')
                }
            }
        } else {
            Swal.fire(
                'Warning',
                'Please Log In to place order',
                'warning'
            ).then( e => {
                    router.push('/login')
                }
            )
        }
    }

    return (
        <>
            <section id="My_Cart_Wrappers_Area">
                <div className="container">
                    <My_Cart order={order} setOrder={setOrder} delivery_charge={delivery_charge}/>
                    <Additional_Items_Select_Delivery user={props.user} location={location} setLocation={setLocation}/>
                    <Payment_Area/>
                    <div className="Orders-Button" style={{ float: 'right',marginTop: 20}}>
                        <a className="btn button-site" onClick={handlePlaceOrder}>
                            Place Order
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
