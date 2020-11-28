import React, { useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import {Modal} from 'react-bootstrap'
import MapModal from "../Common/Cart/Map/modal";

const Add_Address = props => {

    return (
        <>
            <div className="col-lg-6">
                <div className="Add_add_modals"  onClick={props.handleClick}>
                    <a href="#!"><AiOutlinePlus/></a>
                    <h4>Add address</h4>
                </div>
            </div>

        </>
    )
}

export default Add_Address
