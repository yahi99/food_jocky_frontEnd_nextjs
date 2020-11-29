import React from 'react'

const order_details = () => {
 return (
  <>
           <div className="order-summery">
          <div className="order-summery-heading">
           <h2>Order Details</h2>
          </div>
          <div className="dots-area"> </div>
          <div className="order-summery-text">
            <ul>
             <li><span>Your order from:</span>ABC Restaurant</li>
             <li><span> Order No:</span> #01</li>
             <li><span> Delivery Address:</span> 32, choto mirjapur, khulna </li>
            </ul>
          </div>
          <div className="dots-area"> </div>
          <div className="list_price_area">
            <div className="order-items-list">
              <div className="order-items-product">
                  <p><strong>1x</strong> Cutlery</p>
              </div>
              <div className="order-items-product">
                  <p>PHP0.00</p>
              </div>
            </div>
            <div className="order-items-list">
              <div className="order-items-product">
                  <p><strong>1x</strong> Cutlery</p>
              </div>
              <div className="order-items-product">
                  <p>PHP945.00</p>
              </div>
            </div>
          </div>
          <div className="subtotal_order_price">
          <div className="order-items-list-totals">
              <div className="order-items-product">
                  <p>Subtotal</p>
              </div>
              <div className="order-items-product">
                  <p>PHP945.00</p>
              </div>
            </div>
          </div>
          <div className="order-summery-vat">
          <div className="order-items-list">
              <div className="order-items-product">
                  <p><strong>Total</strong>(Incl. VAT)</p>
              </div>
              <div className="order-items-product">
                  <p>PHP945.00</p>
              </div>
            </div>
          </div>
        </div>
  </>
 )
}

export default order_details
