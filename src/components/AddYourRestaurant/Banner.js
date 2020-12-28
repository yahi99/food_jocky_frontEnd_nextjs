import React from 'react'
import Link from "next/link";
const Banner = () => {
 return (
  <>
   <section id="Add_Your_Restaurant_Banner">
     <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
             <div className="add_res_foot_Wrap">
                <h2>PARTNER WITH US</h2>
               <Link href="https://app.foodjocky.com/register">
                <a className="btn button-site">Join Now</a>
                </Link>
             </div>
          </div>
        </div>
     </div>
   </section>
  </>
 )
}

export default Banner
