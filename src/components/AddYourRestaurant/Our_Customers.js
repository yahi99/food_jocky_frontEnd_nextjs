import React from 'react'
import {Our_Customers_Data} from './Our_Customers_Data'

const Our_Customers = () => {
 return (
  <>
   <section id="Our_Customers_wrap">
      <div className="container">
        <div className="row">
         <div className="col-lg-12">
           <div className="customer_headings">
          <h2>Our customers love good food. <br/> You prepare it. We bring it.</h2>
           </div>
         </div>
        </div>
        <div className="row">
         {Our_Customers_Data.map(data=>(
             <div className="col-lg-4 col-md-6 col-sm-6 col-12">
             <div className="customers_inner_texted">
                  <h2>{data.title}</h2>
               <p>{data.para}</p>
             </div>
             </div>
         ))}
        </div>
      </div>
   </section>
  </>
 )
}

export default Our_Customers
