import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Spin} from "antd";

const Loader = () => {
    const router = useRouter()
    const [show, setShow] = useState(false)

    useEffect(() => {
        window.onload = () => {
            setShow(false)
        }
        function routeChangeStart(url) {
            setShow(true);
        }
        function routeChangeComplete(url) {
            setShow(false);

        }
        router.events.on( 'routeChangeStart', routeChangeStart);
        router.events.on( 'routeChangeComplete', routeChangeComplete);
    })

    return (
        <div className="position-fixed justify-content-center align-items-center vw-100 vh-100" style={{zIndex: 99999, background: '#11111144', display: show ? 'flex': 'none'}} id="modal-loader">
            <div className="modal-body text-center">
                <Spin size="large" wrapperClassName="loader-spin"/>
            </div>
        </div>
    )
}
export default Loader