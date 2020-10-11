import React from 'react'
import Link from 'next/link';

function Register() {
 return (
  <>
    <section className="login_main_area">
   <div className="container">
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="login-form-area">
            <div className="headin-waise">
                <h2>Register</h2>
            </div>
            <form>
              <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Name" className="form-control" />
              </div>
              <div className="form-group">
              <label>Number</label>
              <input type="text" placeholder="Mobile Number" className="form-control" />
              </div>
              <div className="form-group">
              <label>Email (Optional)</label>
              <input type="text" placeholder="Email Address" className="form-control" />
              </div>
              <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="password" className="form-control" />
              </div>
             <div className="button-singup-area">
               <div className="form-submit-button">
                   <button type="button" className="btn button-site">Register</button>
               </div>
               <div className="create-account">
                   <Link href="/login" className="pass-for">Alredy have an account?</Link>
               </div>
             </div>
            </form>
        </div>
      </div>
    </div>
   </div>
   </section>
  </>
 )
}

export default Register
