import React from 'react'
import AdditinalBoxed from '../Rider/AdditinalBoxed'
import AddData from '../Rider/AdditinalData'

const AdditionalArea = () => {
 const AddDatas = (val) =>{
   return <AdditinalBoxed img={val.img} para={val.para} />
 }
 return (
  <>
  <section id="additional-area">
   <div className="container">
    <div className="row">
      <div className="col-lg-12">
          <div className="additional-heading">
            <h2>Additional perks</h2>
          </div>
      </div>
     {AddData.map(AddDatas)}
    </div>
   </div>
   </section> 
  </>
 )
}

export default AdditionalArea
