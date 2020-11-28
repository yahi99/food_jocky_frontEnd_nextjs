import React from 'react'
import My_Cart from './My_Cart'
import Additional_Items_Select_Delivery from './Additional_Items_Select_Delivery'
import Payment_Area from './Payment_Area'

const Cart = props => {
    return (
        <>
            <section id="My_Cart_Wrappers_Area">
                <div className="container">
                    <My_Cart order={props.order} setOrder={props.setOrder}/>
                    <Additional_Items_Select_Delivery/>
                    <Payment_Area/>
                </div>
            </section>
        </>
    )
}

export default Cart
