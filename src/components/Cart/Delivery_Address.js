import React, {useState} from 'react'
import Add_Address from './Add_Address'
import With_Address from './With_Address'
import Cart_Heading from './Cart_Heading'
import Add_Info from './Add_Info'
import MapModal from "../Common/Cart/Map/modal";

const Delivery_Address = () => {

    const [addAddress , setAddAddress ] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMapLocationSet = value => {
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
                        {addAddress || (
                            <>
                                <Add_Address handleClick={handleShow}/>
                                <With_Address/>
                            </>
                        )}

                    </div>
                </div>
                { addAddress && (
                    <Add_Info setAddAddress={setAddAddress}/>
                )}
            </div>
            <MapModal show={show} handleClose={handleClose} handleSelect={handleMapLocationSet} setAddress={setAddAddress}/>
        </>
    )
}

export default Delivery_Address
