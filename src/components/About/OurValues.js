import React from 'react'
import CommonHeading from '../About/CommonHeading'
import {OurValusData} from '../About/OurValuesData'
import OurValuesCard from '../About/OurValuesCard'

const OurValues = () => {
 const HowItDatas=(val)=>{
  return <OurValuesCard heading={val.heading} para={val.para} />
 }
 return (
  <>
   <section id="OurValues-Area">
    <div className="container">
     <CommonHeading heading="Our Values"/>
     <div className="row">
       {OurValusData.map(HowItDatas)}
     </div>
    </div>
   </section>
  </>
 )
}

export default OurValues
