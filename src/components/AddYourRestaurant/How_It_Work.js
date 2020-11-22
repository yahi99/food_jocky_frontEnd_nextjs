import React from 'react'
import {How_It_Work_Data} from './How_It_Work_Data'
const How_It_Work = () => {
 return (
  <>
   <section id="How_It_Works_Res">
      <div className="container">
       <div className="row">
         <div className="col-lg-12">
            <div className="tile_how_it">
             <h2>How it works:</h2>
            </div>
         </div>
       </div>
       <div className="row">
         {How_It_Work_Data.map(data=>(
           <div className="col-lg-3 col-md-6 col-sm-6 col-12">
           <div className="res_how_it_inner">
            <img src={data.img} alt="icon" />
            <p>{data.para}</p>
           </div>
         </div>
         ))}
       </div>
      </div>
   </section>
  </>
 )
}

export default How_It_Work
