import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {useRouter} from "next/router";

function Loader() {

    const router = useRouter()
    const [show, setShow] = useState(false);


    const scroolTop = e => {
        window.scrollTo({
         top: 0,
         left: 0,
         behavior: 'smooth'
       });
       }

    useEffect(function (){
        function routeChangeStart(url) {
            setShow(true);
        }
        function routeChangeComplete(url) {
            setShow(false);
            scroolTop();
        }
        router.events.on( 'routeChangeStart', routeChangeStart);
        router.events.on( 'routeChangeComplete', routeChangeComplete);

    }, [ show ]);

    let loaderStyle = {
        padding: '200px auto',
        background: 'transparent'
    }

    return (
        <Modal show={show} centered={true} id="modal-lodar">
            <div className="modal-body text-center">
                <div className="loader"></div>
                <div className="loader-txt">
                    <p>Loading</p>
                </div>
            </div>
        </Modal>
    )
}

export default Loader