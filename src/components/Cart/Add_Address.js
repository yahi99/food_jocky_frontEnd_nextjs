import React, { useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import {Modal} from 'react-bootstrap'
import MapModal from "../Common/Map/modal";

const Add_Address = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="col-lg-6">
                <div className="Add_add_modals"  onClick={handleShow}>
                    <a href="#!"><AiOutlinePlus/></a>
                    <h4>Add address</h4>
                </div>
            </div>
            <MapModal show={show} handleClose={handleClose}/>
        </>
    )
}

export default Add_Address
