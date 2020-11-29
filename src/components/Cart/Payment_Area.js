import React from 'react'
import Cart_Heading from './Cart_Heading'
const Payment_Area = () => {
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
                                <input type="radio" className="form-check-input" name="optradio" checked={true}/>Cash on Delivery
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
