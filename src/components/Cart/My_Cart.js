import React from 'react'
import Cart_Heading from './Cart_Heading'
import Cart_Card from './Cart_Card'

const My_Cart = () => {
 return (
  <> 
 <div className="row">
     <div className="col-lg-12">
       <div className="Cart-Area-Heading-top">
        <Cart_Heading heading='My Cart' />
        <span>(1 Items)</span>
       </div>
       <div className="restaurant_thumd_area"> 
         <div className="res_thumd_img">
         <img src="/assets/img/thumb.jpg" alt="logo" />
         </div>
         <div className="thumb_name_details">
           <p>Ordered From</p>
           <h6><a href="#!">Waterfall Restaurant Banglamotor - Eskaton</a></h6>
         </div>
       </div>
      <Cart_Card/>
     </div>
   </div>
  </>
 )
}

export default My_Cart
