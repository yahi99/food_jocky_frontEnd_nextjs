import React from 'react'
import SomeCard from '../Rider/SameCard'
import {SomeData} from '../Rider/SomeData'

const SomeThings = () => {
   const someDatas=(val)=>{
      return <SomeCard img={val.img} para={val.para}/>
   }
 return (
  <>
   <section id="something-area">
     <div className="container">
      <div className="row">
         <div className="col-lg-12">
          <div className="something-heading">
             <h2>Some things you'll need</h2>
          </div> 
         </div>
         
        {SomeData.map(someDatas)}

      </div>
     </div>
   </section>
  </>
 )
}

export default SomeThings
