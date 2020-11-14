import React from 'react'

const Cta = () => {
  const scroolTop = e => {
   window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  }

 return (
  <>
  <section id="rider-cta">
   <div className="container">
      <div className="row">
         <div className="col-lg-12"> 
            <div className="cat-text">
            <h2>Get started</h2>
            <div className="apply-button">
             <a onClick={scroolTop} className="btn button-site">APPLY NOW</a>
            </div>
            </div>
         </div>
      </div>
   </div>
  </section>
  </>
 )
}

export default Cta
