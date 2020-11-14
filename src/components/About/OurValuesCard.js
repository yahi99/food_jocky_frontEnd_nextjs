import React from 'react'

const OurValuesCard = (props) => {
 return (
  <>
    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
      <div className="our-values-text">
       <h3>{props.heading}</h3>
      <p>{props.para}</p>
      </div>
     </div> 
  </>
 )
}

export default OurValuesCard
