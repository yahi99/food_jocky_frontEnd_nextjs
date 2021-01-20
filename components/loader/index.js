import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

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
        <Modal show={show} centered={true} id="modal-loader">
            <div className="modal-body text-center">
                <div className="loader"></div>
                <div clas="loader-txt">
                    <p>Loading</p>
                </div>
            </div>
        </Modal>
    )
}
export default Loader