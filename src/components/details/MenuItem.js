import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
function MenuItem(props) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 return (
  <>
  
    <div className="col-lg-12 col-md-12 col-12">
                    <div className="setmenu_Items_wrapers">
                    <div className="set_menu_inner_area">
                    <div className="row">
                    <div className="col-lg-3">
                    <div className="items_img">
                    <img src="/assets/img/food1.jpg" alt="" />
                    </div>
                    </div>
                    <div className="col-lg-8">
                    <div className="set_menu_details">
                    <h3>Margherita Pizza + Choice of Desserts</h3>
                    <p>Tomatoes, mozzarella, and basil. Served with choice of Desserts. Lorem ipsum dolor sit amet,</p>
                    <h4>$20</h4>
                    </div>
                    </div>
                    <div className="col-lg-1">
                    <div className="Add_menu_area">
                    <a href="#!"><img onClick={handleShow} src="/assets/img/plus.svg" alt="svg" /></a>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
              </div>

          <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <div className="top_header_modal">
            <div className="modal_header_big">
          <h3>Kacchi Platter-3</h3>
          <p>Regular Kacchi, Borhani, Firni</p>
            </div>
            <div className="start_from">
                <p>Starts From</p>
                <h3>Tk. 1590</h3>
            </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="item-food-select">
                <h4>Available Options *</h4>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                <label className="form-check-label" for="exampleRadios1">
                Default radio
                </label>
                <p>Tk. 340</p>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                <label className="form-check-label" for="exampleRadios2">
                Second default radio
                </label>
                <p>Tk. 340</p>
                </div>
            </div>
         </Modal.Body>
        <Modal.Footer>
          <div className="Modal_footer_Price">
            <h3>Total Price <span>(Including Toppings)</span> </h3>
            <h4>Tk. 1590</h4>
          </div>
          <div className="footer_Add_btn">
          <button className="btn button-site" onClick={handleClose}>Add Item</button>
          </div>
        </Modal.Footer>
      </Modal>
  </>
 )
}

export default MenuItem
