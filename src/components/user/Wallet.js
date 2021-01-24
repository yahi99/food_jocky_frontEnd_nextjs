import React from 'react'
import Sidebar from './Sidebar'

const WalletArea = () => {
 return (
  <>
  <section id="wallet_area">
   <div className="container">
    <div className="row">
    <Sidebar/>
    <div className="col-lg-8 col-sm-12 col-md-8 col-12">
     <div className="all_wallets_wrappers">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="boxshadow_Wallet">
             <div className="common_wallet_heading">
             <h3>Wallet</h3>
            </div>
            <div className="wallet_balance_area">
              <p>Wallet Balance</p>
              <h4>$345.90</h4>
            </div>
            <div className="wallet_balance_flex">
            <div className="wallet_balance_area">
              <p>Total Credit</p>
              <h4>$335445.90</h4>
            </div>
            <div className="wallet_balance_area">
              <p>Total Debit</p>
              <h4>$34d78745.60</h4>
            </div>
            </div>
            <div className="wallet_range_bar">
              <div className="top_range_bar">
                 <p>$478545</p>
                 <p>$478545</p>
              </div>
              <div className="main_range_bar">
               <span>45%.44</span>
              </div>
            </div>
             </div> 
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
             <div className="boxshadow_Wallet">
             <div className="common_wallet_heading">
             <h3>Add Wallet</h3>
            </div>
             <div className="add_wallet_input ">
             <div className="input-group">
             <div className="input-group-prepend">
             <span className="input-group-text">$</span>
             </div>
             <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
             </div>
             </div>
              <div className="add_wallet_button">
                 <span>OR</span>
                 <div className="add_wallet_main_button">
                   <button className="btn button-site">$50</button>
                   <button className="btn button-site">$100</button>
                   <button className="btn button-site">$150</button>
                 </div>
                <div className="add_wallet_submit_button">
                <button className="btn button-site">Add to Wallet</button>
                </div>
              </div>
             </div> 
          </div>
        </div>
     <div className="wallets_table">
      <h3>Wallet Transactions</h3>
      <div className="table-responsive">

      
     <table className="table">
       <tr>
        <th>S.NO</th>
        <th>Date</th>
        <th>Wallet</th>
        <th>Credit</th>
        <th>Debit</th>
        <th>Txt amt</th>
        <th>Available</th>
        <th>Reason</th>
        <th>Status</th>
       </tr>
       <tr>
        <td>1</td>
        <td>22 jul 2020</td>
        <td>$576.2</td>
        <td>$0</td>
        <td>$200</td>
        <td>$0</td>
        <td>$567.6</td>
        <td>Booked a Service</td>
        <td><span>Debit</span></td>
       </tr>
       <tr>
        <td>1</td>
        <td>22 jul 2020</td>
        <td>$576.2</td>
        <td>$0</td>
        <td>$200</td>
        <td>$0</td>
        <td>$567.6</td>
        <td>Booked a Service</td>
        <td><span>Debit</span></td>
       </tr>
       <tr>
        <td>1</td>
        <td>22 jul 2020</td>
        <td>$576.2</td>
        <td>$0</td>
        <td>$200</td>
        <td>$0</td>
        <td>$567.6</td>
        <td>Booked a Service</td>
        <td><span>Debit</span></td>
       </tr>
       <tr>
        <td>1</td>
        <td>22 jul 2020</td>
        <td>$576.2</td>
        <td>$0</td>
        <td>$200</td>
        <td>$0</td>
        <td>$567.6</td>
        <td>Booked a Service</td>
        <td><span>Debit</span></td>
       </tr>
       <tr>
        <td>1</td>
        <td>22 jul 2020</td>
        <td>$576.2</td>
        <td>$0</td>
        <td>$200</td>
        <td>$0</td>
        <td>$567.6</td>
        <td>Booked a Service</td>
        <td><span>Debit</span></td>
       </tr>

      </table>
      </div>
     </div>
     </div>
    </div>
    </div>
   </div>
  </section>
   
  </>
 )
}

export default WalletArea
