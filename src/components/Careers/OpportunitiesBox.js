import React from 'react'
import {OpportunitiesData} from '../Careers/OpportunitiesData'
const OpportunitiesBox = (props) => {
 return (
  <>
  {OpportunitiesData.map(data=>(
    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
    <div className="oppportunities-boxed">
        <h3>{data.count}</h3>
         <p>{data.title}</p>
    </div>
 </div>
  ))}
       
  </>
 )
}

export default OpportunitiesBox
