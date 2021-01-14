import React from 'react'

const order_details = props => {
    return (
        <>
            <div className="order-summery">
                <div className="order-summery-heading">
                <h2>Order Details</h2>
            </div>
            <div className="dots-area"> </div>
            <div className="order-summery-text">
                <ul>
                    <li><span>Your order from:</span> {props.order.restaurant.name}</li>
                    {/*<li><span> Pin:</span> {props.order.pin}</li>*/}
                    <li><span> Delivery Address:</span> {props.order.delivery_info.floor_no}, {props.order.delivery_info.house_no}, {props.order.delivery_info.address.address}  </li>
                </ul>
            </div>
            <div className="dots-area"> </div>
                <div className="list_price_area">
                    {props.order.items.map((item, index) => (
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
                            <p>BDT {props.order.sub_total}</p>
                        </div>
                    </div>
                    <div className="order-items-list-totals">
                        <div className="order-items-product">
                            <p>Vat</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT 0</p>
                        </div>
                    </div>

                    <div className="order-items-list-totals">
                        <div className="order-items-product">
                            <p>Delivery Charge</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT {props.order.delivery_charge}</p>
                        </div>
                    </div>
                </div>
                <div className="order-summery-vat">
                    <div className="order-items-list">
                        <div className="order-items-product">
                            <p><strong>Total</strong>(Incl. VAT)</p>
                        </div>
                        <div className="order-items-product">
                            <p>BDT {props.order.total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default order_details
