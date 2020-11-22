import React from 'react'
import {PrivacyData} from './PrivacyData'
const Privacy = () => {
 return (
  <>
      <section id="Terms_And_Conditions">
     <div className="container">
       <div className="row">
        <div className="col-lg-12">
           <div className="terms_area_wrapper">
              <div className="last_update">
                <p>Last updated on <strong>September 30, 2020</strong></p>
              </div>
              <div className="area_terms_wrapper">
                  {PrivacyData.map(data=>(
                       <div className="area_terms_items">
                        <p>{data.para}</p>
                       </div>
                  ))}
              </div>
           </div>
        </div>
       </div>
     </div>
   </section>
  </>
 )
}

export default Privacy
