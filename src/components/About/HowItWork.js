import React from 'react'
import CommonHeading from '../About/CommonHeading'
import HowItCard from '../About/HowItCard'
import {HowitData} from '../About/HowItData'
const HowItWork = () => {
 const HowDatas = (val)=>{
    return <HowItCard img={val.img} title={val.title}/>
 }
 return (
  <>
   <section id="howitwork-area">
    <div className="container">
      <CommonHeading heading="How It Work" />
    <div className="row">
      {HowitData.map(HowDatas)}
    </div>
    </div>
   </section>
  </>
 )
}

export default HowItWork
