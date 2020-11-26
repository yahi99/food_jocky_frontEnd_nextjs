import React, { useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import {Modal} from 'react-bootstrap'

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

export default Add_Address
