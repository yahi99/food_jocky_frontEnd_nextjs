import React from 'react'

const DealsHeading = (props) => {
 return (
  <>
      <div className={"deals-headings " + props.className}>
             <h2>{props.heading}</h2>
             <p>{props.para}</p>
         </div>
  </>
 )
}

export default DealsHeading
