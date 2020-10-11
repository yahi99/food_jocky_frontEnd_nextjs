import React, {useState} from 'react'
import CategoriesTable from './CategoriesTable'
import SearchBox from './SearchBox'
import Modal from "react-bootstrap/Modal";
import { MDBInput } from "mdbreact"

const Categories=()=> {
 const [selectedDate, handleDateChange] = useState(new Date());
 const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 return (
  <>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="modal_padding">
          <Modal.Title>NEW CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-dialog" id="locationSelectModal">
      <div className="modal-content">
       
        <div className="modal-body">
          <form>
          <MDBInput label="Material input" />
          <div className="save_clear_btn">
             <button type="button"  className="btn button-site">Add Item</button>
             <button type="button"  className="btn button-site">Remove Item</button>
             </div>
          </form>
        </div>
      </div>
    </div>
        </Modal.Body>
      </Modal>
     <div className="row">
       <div className="col-lg-12">
       <div className="heading_top_area">
              <h2>Categories</h2>
          </div>
          <div className="search_filed_modalbtn">
            <div className="search_table">
               <SearchBox/>
            </div>
            <div className="modal_categories">
            <button type="button"  className="btn button-site" onClick={handleShow }>Add New</button>
            </div>
          </div>
          <div className="categories_table_area">
           <CategoriesTable/>
          </div>
       </div>
     </div>

  </>
 )
}

export default Categories
