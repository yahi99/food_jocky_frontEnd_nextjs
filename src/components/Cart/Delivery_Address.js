import React, {useState} from 'react'
import Add_Address, {GetAllAddress} from './Add_Address'
import With_Address from './With_Address'
import Cart_Heading from './Cart_Heading'
import Add_Info from './Add_Info'
import MapModal from "../Common/Cart/Map/modal";
import {useQuery} from "urql";
import UrqlProvider from "../urql/urql-provider";
import Cookies from 'js-cookie'
import {BsPencil} from "react-icons/bs";
import {RiDeleteBinLine} from "react-icons/ri";

const Delivery_Address = props => {

    const [addAddress , setAddAddress ] = useState(false);
    const [address , setAddress ] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMapLocationSet = value => {
        setAddress(value);
        handleClose()
        setAddAddress(true);
        window.scrollTo(0, 1200);
    }


    return (
        <>
            <div className="Delivery_Address_wrappers" id="delivery_address">
                <div className="devlivery_address_flex">
                    <Cart_Heading heading="Delivery Address" />
                </div>
                <div className="Address_inners_wrap">
                    <div className="row">
                        {addAddress  || (
                            <>
                                <Add_Address handleClick={handleShow} />
                                <UrqlProvider token={Cookies.get('token')}>
                                    <GetAllAddress location={props.location} setLocation={props.setLocation}/>
                                </UrqlProvider>
                            </>
                        )}

                    </div>
                </div>
                { addAddress && (
                    <Add_Info setAddAddress={setAddAddress} address={address} user={props.user}/>
                )}
            </div>
            <MapModal show={show} handleClose={handleClose} handleSelect={handleMapLocationSet}/>
        </>
    )
}

export default Delivery_Address









