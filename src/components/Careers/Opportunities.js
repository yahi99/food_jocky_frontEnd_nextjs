import React from 'react'
import OpportunitiesBox from '../Careers/OpportunitiesBox'

const Opportunities = () => {
 return (
  <>
   <section id="oppportunities-area">
     <div className="container">
     <div className="row">
        <div className="col-lg-12">
        <div className="oppportunities-text">
         <h2>A WORLD OF OPPORTUNITIES</h2>
        </div>
        </div>
     </div>
     <div className="row">
          <OpportunitiesBox/>
        </div>
     </div>
   </section>
  </>
 )
}

export default Opportunities
