import React from 'react'
import {BiPhone, BiPhoneIncoming} from "react-icons/bi";

const NeedSupport = props => {
    return (
        <>
            <div className="need_support_page">
                <h2>Need support?</h2>
                <p>Questions regarding your order? Reach out to <strong>{props.order.restaurant.name}</strong></p>
                <div className="support_link">
                    <p>
                        <a href="tel:+88001882453300"><BiPhone/>01882-453300</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default NeedSupport
