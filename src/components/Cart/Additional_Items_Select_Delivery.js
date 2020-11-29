import React from 'react'
import Additional_Itemes from './Additional_Itemes'
import Delivery_Address from './Delivery_Address'
const Additional_Items_Select_Delivery = props => {
    return (
        <>
            <div className="row">
                <div className="col-lg-4">
                    <Additional_Itemes/>
                </div>
                <div className="col-lg-8">
                    <Delivery_Address user={props.user} location={props.location} setLocation={props.setLocation}/>
                </div>
            </div>
        </>
    )
}

export default Additional_Items_Select_Delivery
