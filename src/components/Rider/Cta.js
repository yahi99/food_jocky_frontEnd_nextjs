import React from 'react'
import Link from "next/link";

const Cta = () => {

 return (
  <>
  <section id="rider-cta">
   <div className="container">
      <div className="row">
         <div className="col-lg-12"> 
            <div className="cat-text">
            <h2>Get started</h2>
            <div className="apply-button">
             <Link href="https://dashboard.foodjocky.com/register">
                  <a className="btn button-site">Appply Now</a>
                  </Link>
            </div>
            </div>
         </div>
      </div>
   </div>
  </section>
  </>
 )
}

export default Cta
