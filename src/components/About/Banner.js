import React from 'react'

const Banner = (props) => {
 return (
  <>
   <section id="common_banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
        <div className="common-banner-text">
         <h2>{props.heading}</h2>
        </div>
        </div>
      </div>
    </div>
   </section>
  </>
 )
}

export default Banner
