import {RiDeleteBinLine} from "react-icons/ri";
import React from "react";
import { deleteDeliveryAddress, fetchDeliveryAddresses} from "../../app/slices/order/actions";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";

const Address = ({address, selected, setSelected}) => {
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
            <div className="add_location_area" style={{outline: (selected && selected._id == address._id) ? '1px solid limegreen': 'none'}} onClick={()=>setSelected(address)}>
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

export default Address