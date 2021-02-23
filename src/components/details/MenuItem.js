import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Cookies from 'js-cookie'
import Swal from "sweetalert2";

const MenuItem = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ current, setCurrent ] = useState(null);

    const addVariation = e => {
        addToCart({
            _id: props.item._id,
            name: props.item.name,
            price: current.price,
            size: current.size
        })
        handleClose()
    }


    const addToCart = item => {
        let order = JSON.parse(Cookies.get('my_order') || "{}");
        if(order.orders == undefined || order.orders.length < 1  ) {
            order = {
                restaurant_name: props.restaurant.name,
                restaurant_id: props.restaurant._id,
                orders: [
                    {food_id: item._id, food_name: item.name, price: item.price, size: item.size || '', quantity: 1, category_id: props.category_id}
                ]
            }
            Cookies.set('my_order', order);
            props.setOrder(JSON.parse(Cookies.get('my_order')))
        } else {
            if ( order.restaurant_id != props.restaurant._id ) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You have order from another restaurant, do you want to remove those ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        order = {
                            restaurant_name: props.restaurant.name,
                            restaurant_id: props.restaurant._id,
                            orders: [
                                {food_id: item._id, food_name: item.name, price: item.price, size: item.size || '', quantity: 1, category_id: props.category_id}
                            ]
                        }
                        Cookies.set('my_order', order);
                        props.setOrder(JSON.parse(Cookies.get('my_order')))
                    }
                })
            } else {
                let sameOrder = order.orders.find( orderItem => {
                    if( orderItem.food_id == item._id ) {
                        if( orderItem.size == ( item.size|| '') ) {
                            orderItem.quantity ++
                            return true;
                        }
                    }
                })


                if(sameOrder == undefined) {
                    order.orders.push({food_id: item._id, food_name: item.name, price: item.price, size: item.size || '', quantity: 1, category_id: props.category_id})
                }
                Cookies.set('my_order', order);
                props.setOrder(JSON.parse(Cookies.get('my_order')))
            }
        }

    }

    return (
        <>
            <div className="col-lg-6 col-md-12 col-12">
                <div className="setmenu_Items_wrapers">
                    <div className="set_menu_inner_area">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="items_img">
                                    <img src={props.item.dish_img} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="set_menu_details">
                                    <h3>{props.item.name}</h3>
                                    <p>
                                        {props.item.description}
                                    </p>
                                    <h4> BDT {props.item.price}</h4>
                                </div>
                            </div>
                            <div className="col-lg-1">
                                <div className="Add_menu_area">
                                    { props.item.price_and_size.length > 0 ?  (
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
                                                onClick={() => addToCart(props.item)}
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
                            <h3>{props.item.name}</h3>
                            <p>{props.item.description}</p>
                        </div>
                        <div className="start_from">
                            <p>Starts From</p>
                            <h3>Tk. {props.item.price}</h3>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="item-food-select">
                        <h4>Available Options *</h4>

                        {props.item.price_and_size.map((variation, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    style={{cursor: 'pointer'}}
                                    type="radio"
                                    name="exampleRadios"
                                    onClick={() => setCurrent(variation)}
                                />
                                <label className="form-check-label">
                                    {variation.size}
                                </label>
                                <p>Tk. {variation.price}</p>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="Modal_footer_Price">
                        <h3>
                            Total Price <span>(Including Toppings)</span>
                        </h3>
                        { (current && current.price) ? (
                            <h4>Tk. {current.price}</h4>
                        ) : (
                            <h4>Tk. 0</h4>
                        ) }

                    </div>
                    <div className="footer_Add_btn">
                        <button className="btn button-site" onClick={addVariation}>
                            Add Item
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default MenuItem;
