import React from 'react'
import Cart_Heading from './Cart_Heading'

const Payment_Area = ({payment, setPayment}) => {
 return (
    <>
        <div className="row">
            <div className="col-lg-12">
                <div className="payment_method">
                    <div className="Cart-Area-Heading-top">
                        <Cart_Heading heading='Payment Methods' />
                    </div>
                    <div className="payment-area-inner">
                    <form id="payment-form">
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" onClick={() => setPayment('cod')} checked={payment === 'cod'}/>Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio" onClick={() => setPayment('wallet')} checked={payment === 'wallet'}/>Wallet
                            </label>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </>
 )
}


export default Payment_Area
