import React from 'react'
import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
const Cart_Card = () => {
 return (
  <>
   <div className="Cart_Top_Card">
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
  </>
 )
}

export default Cart_Card
