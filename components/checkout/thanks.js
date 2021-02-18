import React from 'react'

const Thanks = () => {
    return (
        <>
            <div className="thanks_area_wrapper">
                <h2>Thank You!</h2>
                <p>Your order is delivered</p>
                <div className="time_count" style={{padding: 10,marginBottom: 25}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none"
                         stroke="#d30807" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-check-circle">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Thanks
