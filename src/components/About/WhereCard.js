import React from 'react'

const WhereCard = (props) => {
 return (
  <>
   <div className="col-lg-3 col-md-6 col-sm-12 col-12">
     <div className="Weboxed">
       <img src={props.img} alt="icon" />
       <p>{props.para}</p>
       <h3>{props.count}</h3>
     </div>
    </div>
  </>
 )
}

export default WhereCard
