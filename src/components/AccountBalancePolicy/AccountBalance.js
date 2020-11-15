import React from 'react'
import AccountHeading from '../AccountBalancePolicy/AccountHeading'
import {AcountBlanceData} from '../AccountBalancePolicy/AcountBalanceData'

const AccountBalance = () => {
 return (
  <>
   <section id="accountbalance">
      <div className="container">
        <div className="row">
           <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="account-wrapper">
                <AccountHeading/>
               {AcountBlanceData.map(data => (
                 <div className="account-balance-list">
                 <div className="account-list-heading">
                <h6>{data.heading}</h6>
                 </div>
                {data.body}
              </div>
               ))}
              </div>
           </div>
        </div>
      </div>
   </section>
  </>
 )
}

export default AccountBalance
