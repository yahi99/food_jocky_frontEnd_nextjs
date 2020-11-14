import React from 'react'

const RiderArea = (props) => {
 return (
  <>
   <section id="rider-area-left">
    <div className="container">
     <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
       <div className="rider-area-img">
       <img src={props.src} alt="img" />
       </div>
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
       <div className="rider-area-text">
         <h2>{props.heading}</h2>
         <p>{props.title}</p>
       </div> 
      </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default RiderArea
