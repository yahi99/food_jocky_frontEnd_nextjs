import React from 'react'

const ProfileSettingForm = () => {
 return (
  <>
   <div className="col-lg-8 col-md-8 col-sm-12 col-12">
     <div className="profile_setting_form">
       <h3>Setting</h3>
      <form>
       <div className="row">
           <div className="col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input type="text" placeholder="First Name" className="form-control" />
             </div>
           </div>
           <div className="col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="form-group">
              <label htmlFor="lname">Last Name</label>
              <input type="text" placeholder="Last Name" className="form-control" />
             </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-12">
             <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email" className="form-control" />
             </div>
           </div>
           <div className="col-lg-12 col-md-12 col-sm-12 col-12">
             <h4 className="change_pass_profile">Cheange Password</h4>
           </div>
           <div className="col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="form-group">
              <label htmlFor="npass">New Password</label>
              <input type="password" placeholder="New Password" className="form-control" />
             </div>
           </div>
           <div className="col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="form-group">
              <label htmlFor="cpass">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" className="form-control" />
             </div>
           </div>
           <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="profile_form_button">
              <button className="btn button-site">Update</button>
            </div>
           </div>
       </div>
       </form> 
     </div>
   </div>
  </>
 )
}

export default ProfileSettingForm
