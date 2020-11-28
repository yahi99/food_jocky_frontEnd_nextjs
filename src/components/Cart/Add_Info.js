import React from 'react'

const Add_Info = props => {
    const handleAddAddress = e => {
        e.preventDefault();
        props.setAddAddress(false);
    }

 return (
  <>
   <div className="add_location_texted">
     <form id="Add_Form_Location">
      <div className="form-group">
      <input type="text" className="form-control" placeholder="Apartment #" />
      </div>
      <div className="form-group">
      <textarea  className="form-control" placeholder="Note to rider - e.g. floor / directions / landmark#" rows="4"></textarea>
      </div>
      <div className="submits_form">
       <button className="btn button-site" onClick={handleAddAddress}>Submit</button>
      </div>
     </form>
   </div>
  </>
 )
}

export default Add_Info
