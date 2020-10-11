import React from 'react'

const SectionHeading = (props) => {
 return (
  <div>
   <div className="heading-section text-center">
            <h2>{props.heading}</h2>
            <p>{props.title}</p>
          </div>
  </div>
 )
}
export default SectionHeading;