import React from 'react'
import Cookies from 'js-cookie'
import {Button, Result} from "antd";

const PaymentVerify = () => {
    let paymentToken = Cookies.get('fj_transaction_id')
    console.log(paymentToken)

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', marginTop: -50}}>
            <Result
                status="success"
                title="Successfully Purchased Cloud Server ECS!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                    <Button type="primary" key="console">
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            />,
        </div>
    )
}
export default PaymentVerify