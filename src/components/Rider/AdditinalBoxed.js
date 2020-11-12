import React from 'react'

const AdditinalBoxed = (props) => {
 return (
  <>
    <div className="col-lg-4">
        <div className="additinal-boxed">
          <img src={props.img} alt="icon" />
          <p>{props.para}</p>
        </div>
      </div>
  </>
 )
}

export default AdditinalBoxed
