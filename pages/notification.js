import React from 'react'
import MainLayout from "../components/layout";
import Layout from "../components/layout";

const notificationData = [
 {
  title:"300 off shops",
  date:"Expires: Feb 25, 2021",
  minOrder:"Minimum order: BDT1,200.00",
  amount:"BDT300.00"
 },
 {
  title:"300 off shops",
  date:"Expires: Feb 25, 2021",
  minOrder:"Minimum order: BDT1,200.00",
  amount:"BDT300.00"
 },
 {
  title:"300 off shops",
  date:"Expires: Feb 25, 2021",
  minOrder:"Minimum order: BDT1,200.00",
  amount:"BDT300.00"
 },
 {
  title:"300 off shops",
  date:"Expires: Feb 25, 2021",
  minOrder:"Minimum order: BDT1,200.00",
  amount:"BDT300.00"
 },
 {
  title:"300 off shops",
  date:"Expires: Feb 25, 2021",
  minOrder:"Minimum order: BDT1,200.00",
  amount:"BDT300.00"
 }
]

const Notification = () => {
 return (
  <>
      <MainLayout>
         <section id="notofications_wrappers">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-12">
                   <div className="notifications_area">
                     <h2>Notification</h2>
                     <div className="notification_items_wrapers">
                      { notificationData.map((data, index)=>(
                       <div className="notification_items" key={index}>
                       <div className="first_flex">
                           <h4>{data.title}</h4>
                           <h5>{data.date}</h5>
                           <p>{data.minOrder}</p>
                       </div>
                       <div>
                       <p className="secend_flex">{data.amount}</p>
                       </div>
                      </div>
                      ))
                      }
                      
                     </div>
                   </div>
                </div>
              </div>
            </div>
         </section>
      </MainLayout>
  </>
 )
}

export default Notification
