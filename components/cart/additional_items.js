import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {AiOutlineMinusSquare} from 'react-icons/ai';
import {AiOutlinePlusSquare} from 'react-icons/ai';

const AdditionalItems = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="additional_itesm_wrap">
                <div className="Cart_Wrap_Heading">
                    <h2>Additional Items</h2>
                </div>
                <div className="Additional_Item_modal" onClick={handleShow}>
                    <img src="/assets/img/drinks.png" alt="img"/>
                    <p>Beverage</p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <div className="top_header_modal">
                        <div className="modal_header_big">
                            <h3>Beverage & Other</h3>
                            <p>Add a Refreshing Beverage to Your Order</p>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="item-food-select">
                        <ul className="area_Modal_inner">
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                            <li className="area_Modal_flexed">
                                <div className="Additional_Inner_items">
                                    <p>7up 1 litre</p>
                                </div>
                                <div className="Additional_Inner_items">
                                    <p>Tk. 15 <AiOutlineMinusSquare/> <span>2</span><AiOutlinePlusSquare/></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdditionalItems
