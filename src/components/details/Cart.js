import React from 'react'
import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
const Cart = () => {
 return (
  <>

 <div className="Catr-Heading">
  <h2>My Cart</h2>
 </div>
<div className="Cart_area_wrappers">
    <div className="Cart_top_area">
      <h4>Biriyani House</h4>
      <h5>2 Items Added</h5>
    </div>
    <div className="food_cart_wrapper">
     <div className="food_cart_items">
       <div className="food_names">
        <h3>Chicken </h3>
        <p>No Toppings</p>
       </div>
       <div className="food_count_price">
        <p>Tk. 15  <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/> </p>
       </div>
       <div className="food_count_total_price">
        <p>Tk. 15</p>
       </div>
     </div>
     <div className="food_cart_items">
       <div className="food_names">
        <h3>WATER</h3>
        <p>No Toppings</p>
       </div>
       <div className="food_count_price">
        <p>Tk. 15  <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/> </p>
       </div>
       <div className="food_count_total_price">
        <p>Tk. 15</p>
       </div>
     </div>
    </div>
    <div className="Food_vat_area">
      <div className="vat-inner-area">
        <h6>Food Price</h6>
        <p>Tk. 63</p>
      </div>
      <div className="vat-inner-area">
        <h6>VAT</h6>
        <p>Tk. 63</p>
      </div>
      <div className="vat-inner-area">
        <h6>Delivery Fee</h6>
        <p>Tk. 63</p>
      </div>
    </div>
    <div className="Total_Areas">
     <h3>Total</h3>
     <h3>Tk. 101.45</h3>
    </div>
    <div className="Orders-Button">
     <a href="#!" className="btn button-site">Place Order</a>
    </div>
   </div>
  </>
 )
}

export default Cart
