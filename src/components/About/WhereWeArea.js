import React from 'react'
import CommonHeading from '../About/CommonHeading'
import WhereCard from '../About/WhereCard'
import {WhereData} from '../About/WhereData'
const WhereWeArea = () => {
 const whereDatas =(val)=>{
  return <WhereCard img={val.img} para={val.para} count={val.count} />
 }
 return (
  <>
   <section id="WhereWe-Area">
   <div className="container">
    <CommonHeading  heading="Where We Area"/>
    <div className="row">
     <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-12">
       <div className="map-img">
          <img src="/assets/img/about/bd.svg" alt="img" />
       </div>
     </div>
    </div>
    <div className="row">
    {WhereData.map(whereDatas)}
   </div>
   </div>

   </section>
  </>
 )
}

export default WhereWeArea
