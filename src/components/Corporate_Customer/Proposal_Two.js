import React from 'react'
import { RiPagesLine } from 'react-icons/ri';
import { GrGroup } from 'react-icons/gr';
import { AiOutlineFieldTime } from 'react-icons/ai';

const Proposal_Two = () => {
 return (
  <>
   <section id="proposal_area_two">
    <div className="container">
     <div className="row">
     <div className="col-lg-6  col-md-8 col-sm-12 col-12">
     <div className="proposal-list">
        <ul>
         <li>  
          <div className="icon-proposal">
           <RiPagesLine/>
          </div>
          <div className="text-proposal">
            <h5>Centralized Billing</h5>
            <p>All orders are combined into bi-monthly invoices to make accounting easy.</p>
          </div>
         </li>
         <li>  
          <div className="icon-proposal">
           <GrGroup/>
          </div>
          <div className="text-proposal">
            <h5>Group Orders</h5>
            <p>Employees can merge their allowances with colleagues so they can order together.</p>
          </div>
         </li>
         <li>  
          <div className="icon-proposal">
           <AiOutlineFieldTime/>
          </div>
          <div className="text-proposal">
            <h5>Pre-Order</h5>
            <p>You can pre-order in advance to prepare for meetings or events. Order from handpicked vendors and organize an event or that next summer party in one go</p>
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

export default Proposal_Two
