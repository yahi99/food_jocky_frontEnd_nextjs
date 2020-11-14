import React from 'react'

const CommonHeading = (props) => {
 return (
  <>
  <div className="row">
   <div className="col-lg-12">
     <div className="inner-comomn-heading">
         <h2>{props.heading}</h2>
     </div>
   </div>
   </div>
  </>
 )
}

export default CommonHeading
