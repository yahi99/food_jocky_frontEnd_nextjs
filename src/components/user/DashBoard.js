import React from 'react'
import { BsBagFill } from 'react-icons/bs';
import { FiRefreshCw } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import Sidebar from './Sidebar'

const DashBoardArea = () => {
 return (
  <>
   <section id="dashboard_wrappers">
    <div className="container">
     <div className="row">
      <Sidebar/>
       <div className="col-lg-8 col-md-8 col-sm-12 col-12">
        <div className="dashboard_wrappers_area">
         <div className="row">
             <div className="col-lg-6">
                <div className="dashboard_top_box">
                <div className="dashboard_top_icon">
                <BsBagFill />
                </div>
                <div className="dashboard_top_text">
                  <h3>Total Orders</h3>
                  <p>207</p>
                </div>
                </div>
             </div>
             <div className="col-lg-6">
                <div className="dashboard_top_box">
                <div className="dashboard_top_icon">
                <FiRefreshCw />
                </div>
                <div className="dashboard_top_text">
                  <h3>Pending Orders</h3>
                  <p>146</p>
                </div>
                </div>
             </div>
         </div>
         <div className="dashboard_table table-responsive">
             <table className="table">
             <tr>
               <th>Order Id</th>
               <th>Payment Method</th>
               <th>Status</th>
               <th>Amount</th>
               <th>Action</th>
              </tr>
              <tr>
               <td>1230</td>
               <td>code</td>
               <td><span>pending</span></td>
               <td>USD 190</td>
               <td><i><GrView/></i></td>
              </tr>
              <tr>
               <td>1230</td>
               <td>code</td>
               <td><span>pending</span></td>
               <td>USD 190</td>
               <td><i><GrView/></i></td>
              </tr>
              <tr>
               <td>1230</td>
               <td>code</td>
               <td><span>pending</span></td>
               <td>USD 190</td>
               <td><i><GrView/></i></td>
              </tr>
              <tr>
               <td>1230</td>
               <td>code</td>
               <td><span>pending</span></td>
               <td>USD 190</td>
               <td><i><GrView/></i></td>
              </tr>
             </table>
              <nav aria-label="Page navigation example">
              <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
              </nav>
         </div>
        </div>
      </div>
     </div>
    </div>
   </section>
  </>
 )
}

export default DashBoardArea
