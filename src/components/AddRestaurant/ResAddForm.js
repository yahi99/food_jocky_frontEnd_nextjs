import React, {useState} from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { MDBInput } from "mdbreact"
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Datatable from './Datatable'
import Modal from "react-bootstrap/Modal";



const ResAddForm =()=> {
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
          <Modal.Title>Add Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="modal-dialog" id="locationSelectModal">
      <div className="modal-content">
       
        <div className="modal-body">
          <form>
          <MDBInput label="Material input" />
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
              <h2>Add Food</h2>
          </div>
          <div className="customer_entry_form">
             <div className="form_heading">
                 <h4>Add Food</h4>
             </div>
             <div className="add_form_area">
             <form id="add_food_form_area">
                <div className="row">
                  <div className="col-lg-6">
                  <FormControl>
                  <InputLabel id="demo-simple-select-label" color="red" >Select Restaurant</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  </FormControl>
                  </div>
                  <div className="col-lg-6">
                  <FormControl>
                  <InputLabel id="demo-simple-select-label"   color="red" >Select Category</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  </FormControl>
                  </div>
                  <div className="col-lg-6">
                  <MDBInput label="Food Title" />
                  </div>
                  <div className="col-lg-6">
                  <MDBInput label="Price" />
                  </div>
                  <div className="col-lg-12">
                  <MDBInput type="textarea" label="Description" rows="5" />
                  <MDBInput type="file" />
                  </div>
                  <div className="file_upload_img">
                     <img src="https://mdbootstrap.com/img/Photos/Others/images/89.jpg" alt="img" />
                  </div>
                  <div className="col-lg-12">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <TimePicker value={selectedDate} onChange={handleDateChange} />
                     </MuiPickersUtilsProvider>
                  </div>
                </div>
                <div className="new_item_btn text-right mt-4">
             <button type="button"  className="btn button-site" onClick={handleShow }>New Item</button>
             </div>
             <Datatable/>
             <div className="save_clear_btn">
             <button type="button"  className="btn button-site">Add Item</button>
             <button type="button"  className="btn button-site">Remove Item</button>
             </div>
             </form>
            
             </div>
          </div>
         </div>
        </div>
  </>
 )
}

export default ResAddForm
