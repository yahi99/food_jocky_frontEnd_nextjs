import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import {Radio} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../../app/slices/restaurant";

const Food = ({food, category_id}) => {
    let dispatch = useDispatch()
    let restaurant = useSelector(state => {
        return {
            _id: state.restaurant.restaurant.data._id,
            name: state.restaurant.restaurant.data.name
        }
    })
    let cart = useSelector(state => state.restaurant.cart)

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [variation, setVariation] = useState(0)
    const handleVariationChange = e => {
        setVariation(e.target.value)
    }

    const addVariation = () => {
        handleClose()
    }

    const addFoodToCart = () => {
        dispatch(addToCart({
            _id: food._id,
            name: food.name,
            size: '',
            price: food.price,
            quantity: 1,
            category_id,
            restaurant,
            cart
        }))
    }



    return (
        <>
            <div className="col-lg-12 col-md-12 col-12">
                <div className="setmenu_Items_wrapers">
                    <div className="set_menu_inner_area">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="items_img">
                                    <img src={food.dish_img} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="set_menu_details">
                                    <h3>{food.name}</h3>
                                    <p>
                                        {food.description}
                                    </p>
                                    <h4> BDT {food.price}</h4>
                                </div>
                            </div>
                            <div className="col-lg-1">
                                <div className="Add_menu_area">
                                    { food.price_and_size.length > 0 ?  (
                                        <a href="#!">
                                            <img
                                                onClick={handleShow}
                                                src="/assets/img/plus.svg"
                                                alt="svg"
                                            />
                                        </a>
                                    ) : (
                                        <a href="#!">
                                            <img
                                                onClick={() => addFoodToCart(food)}
                                                src="/assets/img/plus.svg"
                                                alt="svg"
                                            />
                                        </a>
                                    ) }
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
                            <h3>{food.name}</h3>
                            <p>{food.description}</p>
                        </div>
                        <div className="start_from">
                            <p>Starts From</p>
                            <h3>Tk. {food.price}</h3>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="item-food-select">
                        <h4>Available Options *</h4>
                        <Radio.Group style={{width: '100%'}} value={variation} onChange={handleVariationChange}>
                            {food.price_and_size.map((variation, index) => (
                                <div className="form-check" style={{paddingLeft: 0}} key={index}>
                                    <Radio value={index} style={{fontSize: 18, textTransform: 'capitalize'}}>{variation.size}</Radio>
                                    <p>Tk. {variation.price}</p>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="Modal_footer_Price">
                        <h3>
                            Total Price <span>(Including Toppings)</span>
                        </h3>
                        <h4>Tk. {food.price_and_size.length > 0 ? food.price_and_size[variation].price : '0'}</h4>

                    </div>
                    <div className="footer_Add_btn">
                        <button className="btn button-site" onClick={addVariation}>
                            Add Item
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Food