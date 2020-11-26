import React from 'react'
import Add_Address from './Add_Address'
import With_Address from './With_Address'
import Cart_Heading from './Cart_Heading'
import Add_Info from './Add_Info'
import { AiOutlinePlus } from 'react-icons/ai';
const Delivery_Address = () => {
 return (
  <>
   <div className="Delivery_Address_wrappers">
    <div className="devlivery_address_flex">
    <Cart_Heading heading="Delivery Address" />
     <h4><AiOutlinePlus/> Add address</h4>
    </div>
    <div className="Address_inners_wrap">
     <div className="row">
      <Add_Address/>
      <With_Address/>
     </div>
    </div>
    <Add_Info/>
   </div>

  </>
 )
}

export default Delivery_Address
