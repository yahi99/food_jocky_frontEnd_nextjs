import React from 'react'
import Link from "next/link";
const Support = () => {
 return (
  <>
   <section id="support_Wrappers_area">
    <div className="container">
     <div className="row">
        <div className="col-lg-12">
          <div className="support_main_heading">
            <h2>How can we help?</h2>
          </div>
        </div>
        <div className="col-lg-6">
         <Link href="/order_help">  
         <a>
         <div className="support_first_banner">
           <h3>Help with an order</h3>
           <p>Solve any problem related to your orders</p>
           <img src="/assets/img/support/ban1.png" alt="img" />
         </div>
         </a>
         </Link>
        </div>
        <div className="col-lg-6">
        <a href="#!">
         <div className="support_first_banner">
           <h3>General questions</h3>
           <p>Discover how to get the food you love delivered to your door</p>
           <img src="/assets/img/support/ban1.png" alt="img" />
         </div>
         </a>
        </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default Support
