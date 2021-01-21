import {useDispatch, useSelector} from "react-redux";
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import React from "react";
import {addToCart, removeFromCart} from "../../app/slices/restaurant";

const CartTable = ({cart}) => {
    let dispatch = useDispatch()
    let restaurant = useSelector(state => {
        return {
            _id: state.restaurant.restaurant.data._id,
            name: state.restaurant.restaurant.data.name
        }
    })
    let delivery_charge = useSelector(state => state.order.delivery_charge)
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
                                <span>{food.quantity}</span>
                                <AiOutlinePlusSquare style={{cursor: 'pointer', marginLeft:'8px',  fontSize: "20px"}} onClick={() => handlePlus(food)}/>
                            </p>
                        </div>
                        <div className="food_count_total_price">
                            <p>Tk. {food.price * food.quantity}</p>
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
                    <p>Tk. {delivery_charge}</p>
                </div>
            </div>
            <div className="Total_Areas">
                <h3>Total</h3>
                <h3>Tk. {total + delivery_charge}</h3>
            </div>
        </>
    )
}

export default CartTable