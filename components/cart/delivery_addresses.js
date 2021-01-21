import React, {useState} from "react";
import {AiOutlinePlus} from "react-icons/ai";
import MapModal from "./map_modal";
import AddAddress from "./add_address";
import {useSelector} from "react-redux";
import Address from "./address";

const DeliveryAddresses = ({selected, setSelected}) => {
    const [addAddress , setAddAddress ] = useState(false);
    const [address , setAddress ] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleMapLocationSet = value => {
        setAddAddress(true);
        setAddress(value);
        handleClose();
    }

    let addresses = useSelector(state => state.order.delivery_locations )



    return (
        <div className="Delivery_Address_wrappers" id="delivery_address">
            <div className="devlivery_address_flex">
                <div className="Cart_Wrap_Heading">
                    <h2>Delivery Addresses</h2>
                </div>
            </div>
            <div className="Address_inners_wrap" id="add_address_form">
                {addAddress ? (
                    <AddAddress address={address} setAddAddress={setAddAddress}/>
                ) : (
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="Add_add_modals" style={{height: 320, paddingTop: 120}} onClick={handleShow}>
                                <a href="#!"><AiOutlinePlus/></a>
                                <h4>Add address</h4>
                            </div>
                        </div>
                        {addresses.map((address, index) => (
                            <Address address={address} selected={selected} setSelected={setSelected} key={index}/>
                        ))}
                    </div>
                ) }
                <MapModal show={show} handleClose={handleClose} handleSelect={handleMapLocationSet}/>

            </div>
        </div>
    )
}

export default DeliveryAddresses
