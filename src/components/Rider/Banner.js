import React from 'react'
import Link from "next/link";

const Banner = () => {
 return (
  <>
   <section id="banner-rider">
    <div className="container">
     <div className="row">
      <div className="col-lg-12"> 
       <div className="banner-rider-text"> 
          <h5>Become a</h5>
          <h1>Foodjocky Rider</h1>
       </div>
      </div>
      <div className="col-lg-4">
       {/* <form id="city_form">
       <div class="form-group">
    <label for="exampleFormControlSelect1">Enter your city and vehiclet</label>
     <select class="form-control" id="exampleFormControlSelect1">
      <option>Your City</option>
      <option>Khulna</option>
      <option>Dhaka</option>
      <option>Rangpur</option>
      <option>Varamara</option>
    </select>
    <select class="form-control" id="exampleFormControlSelect2">
      <option>Your Vehicle</option>
      <option>Bicycle</option>
      <option>Motorbike</option>
    </select>
    <button className="btn button-site">Sign Up</button>
  </div>
       </form> */}
       <div className="Apply_Now_Btn">
       <Link href="https://dashboard.foodjocky.com/register">
                  <a className="btn button-site">Appply Now</a>
                  </Link>
       </div>
      </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default Banner
