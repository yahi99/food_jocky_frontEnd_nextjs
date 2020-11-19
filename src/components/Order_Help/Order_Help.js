import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import Order_Help_Content from '../Order_Help/Order_Help_Content'
const Order_Help = () => {
 return (
  <>
   <section id="order_helps_area">
     <div className="container">
       <div className="row">
          <div className="col-lg-4">
             <div className="help_sidebar">
              <ul>
               <li className="active">Help with an order</li>
               <li>General questions</li>
              </ul>
             </div>
          </div>
          <div className="col-lg-8">
              <div className="help_text-wrappers">
               <div className="help-centers">
                 <a href="#!">Help center <MdKeyboardArrowRight/></a>
               </div>
               <Order_Help_Content/>
              </div>
          </div>
       </div>
     </div>
   </section>
  </>
 )
}

export default Order_Help
