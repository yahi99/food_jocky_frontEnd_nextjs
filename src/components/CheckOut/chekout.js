 import React from 'react'
 import Order_details from './order_details'
 import NeedSupport from './NeedSupport'
 import Thanks from './Thanks'
 // import Timeline from './Timeline'
 const chekout = () => {
  return (
   <>
    <section id="Check_Out_Wrappers">
     <div className="container">
      <div className="row">
       <div className="col-lg-8">
        {/* <Timeline/> */}
        <Thanks/>
         <NeedSupport/>
       </div>
       <div className="col-lg-4">
        <Order_details />
       </div>
      </div>
     </div>
    </section>
   </>
  )
 }
 
 export default chekout
 