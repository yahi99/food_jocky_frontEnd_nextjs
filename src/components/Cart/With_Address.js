import React, { useState} from 'react'
import {BsPencil} from "react-icons/bs";
import {RiDeleteBinLine} from "react-icons/ri";
import {Modal} from 'react-bootstrap'
const With_Address = () => {
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 return (
  <>
    <div className="col-lg-6">
     <div className="add_location_area">
        <div className="add_texted">
          <p>Sher-E-Bangla Road Khulna University</p>
          <span>Note to rider: none</span>
        </div>
        <div className="icon_area_edite">
           <BsPencil onClick={handleShow} />
           <RiDeleteBinLine/>
        </div>
     </div>
   </div>
   <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <div className="top_header_modal">
            <div className="modal_header_big">
          <h3>Is this your exact location?</h3>
            </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="maps-img">
              <img src="/assets/img/map.png" alt="img" /> 
            </div>
         </Modal.Body>
      </Modal>
  </>
 )
}

export default With_Address
