import React from 'react'

const OrderDetails = ({order}) => {
    return (
        <>
            <div className="order-summery">
                <div className="order-summery-heading">
                    <h2>Order Details</h2>
                </div>
                <div className="dots-area"> </div>
                <div className="order-summery-text">
                    <ul>
                        <li><span>Your order from:</span> {order.restaurant.name}</li>
                        <li><span>Delivery Address:</span> {order.delivery_info.address.address}</li>
                        <li><span>Receiver Name: </span>{order.delivery_info.reciver_name}</li>
                        <li><span>Mobile No: </span>{order.delivery_info.reciver_mobile_no}</li>
                        <li><span>House No: </span>{order.delivery_info.house_no}</li>
                        <li><span>Floor No: </span>{order.delivery_info.floor_no}</li>
                    </ul>
                </div>
                <div className="dots-area"> </div>
                <div className="list_price_area">
                    {order.items.map((item, index) => (
                        <div className="order-items-list">
                            <div className="order-items-product">
                                <p><strong>{item.quantity}x</strong> {item.name} {item.size == ""? "" : `(${item.size})`}</p>
                            </div>

                            <div className="order-items-product">
                                <p>BDT {item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="subtotal_order_price">
                    <div className="order-items-list-totals">
                        <div className="order-items-product">
                            <p>Subtotal</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT {order.sub_total}</p>
                        </div>
                    </div>

                    <div className="order-items-list-totals">
                        <div className="order-items-product">
                            <p style={{color: '#c8102f'}}>Discount</p>
                        </div>
                        <div className="order-items-product">
                            <p style={{color: '#c8102f'}}>BDT -{order.customer_discount_amount}</p>
                        </div>
                    </div>

                    <div className="order-items-list-totals">
                        <div className="order-items-product">
                            <p>Vat</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT {order.vat}</p>
                        </div>
                    </div>

                    <div className="order-items-list-totals">
                        <div className="order-items-product">
                            <p>Delivery Charge</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT {order.delivery_charge}</p>
                        </div>
                    </div>
                </div>
                <div className="order-summery-vat">
                    <div className="order-items-list">
                        <div className="order-items-product">
                            <p><strong>Total</strong>(Incl. VAT)</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT {order.total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetails
