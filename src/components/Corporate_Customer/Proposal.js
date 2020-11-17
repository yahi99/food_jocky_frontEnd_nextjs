import React from 'react'
import { FiUser } from 'react-icons/fi';
import { BsWallet } from 'react-icons/bs';
import { BsBarChart } from 'react-icons/bs';

const Proposal = () => {
 return (
  <>
   <section id="proposal_area">
    <div className="container">
     <div className="row">
     <div className="col-lg-6 offset-lg-6 col-md-8 offset-md-4 col-sm-12 col-12">
     <div className="proposal-list">
        <ul>
         <li>  
          <div className="icon-proposal">
           <FiUser/>
          </div>
          <div className="text-proposal">
            <h5>Invite Employees</h5>
            <p>Add users, departments, multiple company locations, and expense codes.</p>
          </div>
         </li>
         <li>  
          <div className="icon-proposal">
           <BsWallet/>
          </div>
          <div className="text-proposal">
            <h5>Manage Access and Budget</h5>
            <p>Create individual budget rules that define employees' budget allowances, order frequency, dates and times. Employees can pay remaining amounts with their own credit cards.</p>
          </div>
         </li>
         <li>  
          <div className="icon-proposal">
           <BsBarChart/>
          </div>
          <div className="text-proposal">
            <h5>Detailed Reports</h5>
            <p>Download detailed ordering reports from your dashboard to guarantee full transparency.</p>
          </div>
         </li>
        </ul>
     </div>
     </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default Proposal
