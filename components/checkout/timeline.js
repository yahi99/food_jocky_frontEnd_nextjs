import React from 'react'

const Timeline = ({order}) => {


    return (
        <>
            <div className="timelines-wrappers">
                <div className="timeline-inners-wrappers">
                    <ul>
                        <li className={(order.status == 'accepted' || order.status == 'delivered') ? "dots-bg" : ""}>
                            <h5>The restaurant started preparing your food</h5>
                        </li>
                        <li className={order.status == 'delivered' ? "dots-bg" : ""}>
                            <h5>Your Food is Prepared</h5>
                        </li>
                        <li className={order.status == 'delivered' ? "dots-bg" : ""}>
                            <h5>Your Food is picked up for delivery</h5>
                        </li>
                        <li>
                            <h5>Your food will arrive soon</h5>
                        </li>
                    </ul>

                </div>
                <h4 className="text-center" style={{padding: 30, fontSize: 18}}>
                    Estimated delivery time: <span style={{fontSize: 25, color: "#d30807"}}>{order.delivery_time}</span>
                </h4>
            </div>
        </>
    )
}

export default Timeline
