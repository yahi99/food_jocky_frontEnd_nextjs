import React from 'react'

const HowItCard = (props) => {
 return (
  <>
   <div className="col-lg-4 col-md-6 col-sm-12 col-12">
       <div className="how-it-icons">
         <img src={props.img} alt="icon" />
         <h5>{props.title}</h5>
       </div>
     </div>
  </>
 )
}

export default HowItCard
