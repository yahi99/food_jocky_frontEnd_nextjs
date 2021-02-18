import {useDispatch, useSelector} from "react-redux";
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {addToCart, removeFromCart} from "../../app/slices/restaurant";
import Cookies from 'js-cookie'
import {getDistance} from "../../app/slices/order/actions";

const CartTable = ({cart}) => {
    let dispatch = useDispatch()
    let restaurant = useSelector(state => {
        return {
            _id: state.restaurant.restaurant.data._id,
            name: state.restaurant.restaurant.data.name,
            discount: state.restaurant.restaurant.data.discount_given_by_restaurant + state.restaurant.restaurant.data.discount_given_by_admin,
            location: state.restaurant.restaurant.data.address ?  state.restaurant.restaurant.data.address.location : undefined
        }
    })
    let delivery_charge = useSelector(state => state.order.settings.rider_cost)
    let vat = useSelector(state => state.order.settings.customer_vat)
    let distance = useSelector(state => state.order.distance)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        let delivery_to = JSON.parse(Cookies.get('delivery_to') || '{}')
        if(!loaded && restaurant.location && delivery_to.lat) {
            setLoaded(true)
            dispatch(getDistance({lat1: restaurant.location.lat, lng1: restaurant.location.lng, lat2: delivery_to.lat, lng2: delivery_to.lng}))
        }
    })
    let total = 0
    cart.foods.forEach(food => {
        total += food.quantity * food.price
    })

    const handleMinus = food => {
        dispatch(removeFromCart({
            food,
            cart
        }))
    }

    const handlePlus = food => {
        dispatch(addToCart({
            ...food,
            restaurant,
            cart
        }))
    }

    return (
        <>
            <div className="food_cart_wrapper">
                {cart.foods.map((food, index) => (
                    <div className="food_cart_items" key={index}>
                        <div className="food_names">
                            <h3>{food.name} </h3>
                            <p>{food.size}</p>
                        </div>
                        <div className="food_count_price">
                            <p style={{  alignItems:" center", display: "flex"}}>
                                Tk. {food.price}
                                <AiOutlineMinusSquare style={{cursor: 'pointer', marginLeft:'8px',  marginRight:'8px',fontSize: "20px"}} onClick={() => handleMinus(food)}/>
                                <span>{food.quantity.toFixed(2)}</span>
                                <AiOutlinePlusSquare style={{cursor: 'pointer', marginLeft:'8px',  fontSize: "20px"}} onClick={() => handlePlus(food)}/>
                            </p>
                        </div>
                        <div className="food_count_total_price">
                            <p>Tk. {(food.price * food.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="Food_vat_area">
                <div className="vat-inner-area">
                    <h6>Food Price</h6>
                    <p>Tk. {total.toFixed(2)}</p>
                </div>
                <div className="vat-inner-area">
                    <h6 style={{color: '#c8102f'}}>Discount</h6>
                    <p style={{color: '#c8102f'}}>Tk. -{(restaurant.discount * 0.01 * total).toFixed(2)}</p>
                </div>
                <div className="vat-inner-area">
                    <h6>VAT</h6>
                    <p>Tk. {(vat * 0.01 * total).toFixed(2)}</p>
                </div>
                <div className="vat-inner-area">
                    <h6>Delivery Fee</h6>
                    <p>Tk. {(delivery_charge * distance).toFixed(2)}</p>
                </div>
            </div>
            <div className="Total_Areas">
                <h3>Total</h3>
                <h3>Tk. {(total + delivery_charge * distance + (vat * 0.01 * total) - (restaurant.discount * 0.01 * total)).toFixed(2)}</h3>
            </div>
        </>
    )
}

export default CartTable