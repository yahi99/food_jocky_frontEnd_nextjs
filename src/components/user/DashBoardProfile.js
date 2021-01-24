import React from 'react'
import Sidebar from './Sidebar'
import ProfileSettingForm from './ProfileSettingForm'
const DashBoardProfile = () => {
 return (
  <>
    <section id="profile_wrappers">
     <div className="container">
       <div className="row">
         <Sidebar/>
         <ProfileSettingForm/>
       </div>
     </div>
   </section>
  </>
 )
}

export default DashBoardProfile
