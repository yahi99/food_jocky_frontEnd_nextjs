import MainLayout from "../../components/layout";
import Sidebar from "../../components/user/sidebar";
import React, {useEffect, useState} from "react";
import AddAddress from "../../components/cart/add_address";
import {AiOutlinePlus} from "react-icons/ai";
import MapModal from "../../components/cart/map_modal";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {deleteDeliveryAddress, fetchDeliveryAddresses} from "../../app/slices/order/actions";
import {RiDeleteBinLine} from "react-icons/ri";

const DeliveryAddresses = () => {
    let dispatch = useDispatch()
    const [addAddress , setAddAddress ] = useState(false);
    const [address , setAddress ] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if(!loaded) {
            setLoaded(true)
            dispatch(fetchDeliveryAddresses({}))
        }
    })

    const handleMapLocationSet = value => {
        setAddAddress(true);
        setAddress(value);
        handleClose();
    }

    let addresses = useSelector(state => state.order.delivery_locations )

    return (
        <MainLayout>
            <section id="dashboard_wrappers">
                <div className="container">
                    <div className="row">
                        <Sidebar/>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                            <div className="Delivery_Address_wrappers pt-0" id="delivery_address">
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
                                                <div className="Add_add_modals" style={{height: 300, paddingTop: 120}} onClick={handleShow}>
                                                    <a href="#!"><AiOutlinePlus/></a>
                                                    <h4>Add address</h4>
                                                </div>
                                            </div>
                                            {addresses.map((address, index) => (
                                                <Address address={address} key={index}/>
                                            ))}
                                        </div>
                                    ) }
                                    <MapModal show={show} handleClose={handleClose} handleSelect={handleMapLocationSet}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default DeliveryAddresses


const Address = ({address}) => {
    let dispatch = useDispatch()
    const handleDelete = async () => {
        let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
        if(result.isConfirmed) {
            let {payload} = await dispatch(deleteDeliveryAddress({id: address._id}))
            if (payload.error) {
                await Swal.fire('Error', payload.msg, 'error')
            } else {
                await Swal.fire('Success', payload.msg, 'success')
                dispatch(fetchDeliveryAddresses({}))
            }
        }
    }

    return (
        <div className="col-lg-6">
            <div className="add_location_area">
                <div className="add_texted">
                    <h6>{address.title}</h6>
                    <p><strong>Address:</strong> {address.address.address}</p>
                    <p><strong>Reciver Name: </strong>{address.reciver_name}</p>
                    <p><strong>Mobile No: </strong>{address.reciver_mobile_no}</p>
                    <p><strong>House No: </strong>{address.house_no}</p>
                    <p><strong>Floor No: </strong>{address.floor_no}</p>
                    <span>Note to rider: {address.note_to_rider.length > 0 ? address.note_to_rider : 'none'}</span>
                </div>
                <div className="icon_area_edite">
                    <RiDeleteBinLine color="red" onClick={handleDelete}/>
                </div>
            </div>
        </div>
    )
}