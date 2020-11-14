import React from 'react'

const SameCard = (props) => {
 return (
  <>
   <div className="col-lg-3 col-md-6 col-sm-6 col-12">
   <div className="somthing-boxed">
   <img src={props.img} alt="img" />
   <p>{props.para}</p>
   </div>                    
   </div>
  </>
 )
}

export default SameCard
