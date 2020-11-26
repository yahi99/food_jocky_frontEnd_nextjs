import React from "react";
import { AiOutlineMinusSquare } from "react-icons/ai";
import { AiOutlinePlusSquare } from "react-icons/ai";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {addOrder} from "../restaurant/Restaurants";


const Cart = props => {

    const router = useRouter();

    if(! props.order.restaurant_name) {
        return <></>
    }

    if( props.order.orders.length < 1) {
        return <></>
    }

    let total = 0
    props.order.orders.forEach(order => {
        total += order.quantity * order.price
    })

    const handleMinus = (id, size) => {
        let order = props.order
        order.orders.find( orderItem => {
            if( orderItem.food_id == id && orderItem.size == size) {
                orderItem.quantity --
            }
        })
        order.orders = order.orders.filter(orderItem => orderItem.quantity > 0)
        Cookies.set('my_order', order);
        props.setOrder(JSON.parse(Cookies.get('my_order')))
    }
    const handlePlus = (id, size) => {
        let order = props.order
        order.orders.find( orderItem => {
            if( orderItem.food_id == id && orderItem.size == size ) {
                orderItem.quantity ++
            }
        })
        Cookies.set('my_order', order);
        props.setOrder(JSON.parse(Cookies.get('my_order')))
    }

    const handleOrder = async e => {
        if(props.user.authenticated) {
            let items = props.order.orders.map(order => {
                return {
                    _id: order.food_id,
                    category_id: order.category_id,
                    name: order.food_name,
                    price: order.price,
                    quantity: order.quantity,
                    size: order.size
                }
            })
            let order = {
                total: total,
                restaurant: props.order.restaurant_id,
                items: items
            }
            let result = await addOrder(order);
            if(result.error) {
                Swal.fire(
                    'Error',
                    result.msg,
                    'error'
                )
            } else {
                Swal.fire(
                    'Success',
                    'Order Placed Successfully',
                    'success'
                )
                Cookies.set('my_order', {});
                props.setOrder(JSON.parse(Cookies.get('my_order')))
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
            <div className="Catr-Heading">
                <h2>My Cart</h2>
            </div>
            <div className="Cart_area_wrappers">
                <div className="Cart_top_area">
                    <h4>{props.order.restaurant_name}</h4>
                    <h5>{props.order.orders.length} Items Added</h5>
                </div>
                <div className="food_cart_wrapper">
                    {props.order.orders.map((order, index) => (
                        <div className="food_cart_items" key={index}>
                            <div className="food_names">
                                <h3>{order.food_name} </h3>
                                <p>{order.size}</p>
                            </div>
                            <div className="food_count_price">
                                <p>
                                    Tk. {order.price}
                                    <AiOutlineMinusSquare style={{cursor: 'pointer'}} onClick={() => handleMinus(order.food_id, order.size)}/>
                                    <span>{order.quantity}</span>
                                    <AiOutlinePlusSquare style={{cursor: 'pointer'}} onClick={() => handlePlus(order.food_id, order.size)}/>
                                </p>
                            </div>
                            <div className="food_count_total_price">
                                <p>Tk. {order.price * order.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Food_vat_area">
                    <div className="vat-inner-area">
                        <h6>Food Price</h6>
                        <p>Tk. {total}</p>
                    </div>
                    <div className="vat-inner-area">
                        <h6>VAT</h6>
                        <p>Tk. 0</p>
                    </div>
                    <div className="vat-inner-area">
                        <h6>Delivery Fee</h6>
                        <p>Tk. 0</p>
                    </div>
                </div>
                <div className="Total_Areas">
                    <h3>Total</h3>
                    <h3>Tk. {total}</h3>
                </div>
                <div className="Orders-Button">
                    <a onClick={handleOrder} className="btn button-site">
                        Place Order
                    </a>
                </div>
            </div>
        </>
    );
};

export default Cart;
