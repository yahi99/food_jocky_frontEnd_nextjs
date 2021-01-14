import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import React from "react";
import Cookies from "js-cookie";
import {addOrder} from "../../restaurant/Restaurants";
import Swal from "sweetalert2";

const CartTable = props => {

    if(props.order.orders == undefined ) {
        return (
            <h4 className="text-center mt-5" style={{padding: 100}}>Cart is Empty</h4>
        )
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
        if(order.orders.length < 1 ) {
            Cookies.set('my_order', {});
        }
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


    return (
        <>
            <div className="food_cart_wrapper">
                {props.order.orders.map((order, index) => (
                    <div className="food_cart_items" key={index}>
                        <div className="food_names">
                            <h3>{order.food_name} </h3>
                            <p>{order.size}</p>
                        </div>
                        <div className="food_count_price">
                            <p style={{  alignItems:" center", display: "flex"}}>
                                Tk. {order.price}
                                <AiOutlineMinusSquare style={{cursor: 'pointer', marginLeft:'8px',  marginRight:'8px',fontSize: "20px"}} onClick={() => handleMinus(order.food_id, order.size)}/>
                                <span>{order.quantity}</span>
                                <AiOutlinePlusSquare style={{cursor: 'pointer', marginLeft:'8px',  fontSize: "20px"}} onClick={() => handlePlus(order.food_id, order.size)}/>
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
                    <p>Tk. {props.delivery_charge}</p>
                </div>
            </div>
            <div className="Total_Areas">
                <h3>Total</h3>
                <h3>Tk. {total + props.delivery_charge}</h3>
            </div>
        </>
    )
}


export default CartTable
