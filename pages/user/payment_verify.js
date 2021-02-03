import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Button, Result} from "antd";
import {useDispatch} from "react-redux";
import Link from 'next/link'
import {confirmTransaction} from "../../app/slices/user/actions";

const PaymentVerify = () => {
    let dispatch = useDispatch()
    let paymentToken = Cookies.get('fj_transaction_id')
    const [status, setStatus] = useState('')
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            setLoaded(true)
            dispatch(confirmTransaction({id: paymentToken})).then(({payload}) => {
                setStatus(payload.data.status)
            })
        }
    })

    if(status === '') {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', marginTop: -50}}>
                <div className="modal-body text-center">
                    <div className="loader"></div>
                    <div className="loader-txt">
                        <p>Loading</p>
                    </div>
                </div>
            </div>
        )
    }

    if(status === 'VALIDATED' || status === 'VALID') {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', marginTop: -50}}>
                <Result
                    status="success"
                    title="Successfully added to your wallet!"
                    extra={[
                        <Link href="/user/wallet">
                            <Button type="primary" key="console">
                                Back to Wallet
                            </Button>
                        </Link>
                        ,
                    ]}
                />,
            </div>
        )
    }
    if(status === 'CANCELLED') {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', marginTop: -50}}>
                <Result
                    status="error"
                    title="Transaction cancelled!"
                    extra={[
                        <Link href="/user/wallet">
                            <Button type="primary" key="console">
                                Back to Wallet
                            </Button>
                        </Link>
                        ,
                    ]}
                />,
            </div>
        )
    }

    if(status === 'FAILED') {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', marginTop: -50}}>
                <Result
                    status="error"
                    title="Transaction Failed!"
                    extra={[
                        <Link href="/user/wallet">
                            <Button type="primary" key="console">
                                Back to Wallet
                            </Button>
                        </Link>
                        ,
                    ]}
                />,
            </div>
        )
    }


    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', marginTop: -50}}>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={[
                    <Link href="/user/wallet">
                        <Button type="primary" key="console">
                            Back to Wallet
                        </Button>
                    </Link>
                    ,
                ]}
            />
        </div>
    )
}
export default PaymentVerify