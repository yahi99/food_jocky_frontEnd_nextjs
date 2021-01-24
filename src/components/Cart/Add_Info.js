import React, {useState} from 'react'
import Swal from "sweetalert2";
import {addAAddress} from "./Add_Address";
import {useRouter} from "next/router";

const Add_Info = props => {

    let router = useRouter();

    const [title, setTitle] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [receiverNumber, setReceiverNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const [houseNumber, setHouseNumber] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [note, setNote] = useState('');

    const handleTitleChange = e => setTitle(e.currentTarget.value);
    const handleReceiverNameChange = e => setReceiverName(e.currentTarget.value);
    const handleReceiverNumberChange = e => {
        let number = e.currentTarget.value.replace(/\D/g, '')
        setReceiverNumber(number);
        if(number > 0 && number.length != 10) {
            setValidPhoneNumber(false);
        } else {
            setValidPhoneNumber(true);
        }
    }
    const handleHouseNumberChange = e => setHouseNumber(e.currentTarget.value);
    const handleFloorNumberChange = e => setFloorNumber(e.currentTarget.value);
    const handleNoteChange = e => setNote(e.currentTarget.value);



    const handleAddAddress = e => {
        e.preventDefault();

        if( title == '' || receiverName == '' || receiverNumber == '' || !validPhoneNumber) {
            Swal.fire('Warning', 'Please fill up title, Name and Number', 'warning');
        } else if(props.user.authenticated){
            let result = await addAAddress({
                title: title,
                address: props.address,
                reciver_mobile_no: receiverNumber,
                reciver_name: receiverName,
                house_no: houseNumber,
                floor_no: floorNumber,
                note_to_rider: note
            })
            if(result.error) {
                Swal.fire('Error', result.msg, 'error')
            } else {
                Swal.fire('Success', 'Successfully added address' , 'success')
                props.setAddAddress(false);
            }

        } else {
            Swal.fire('Error', 'Please log in', 'error').then(e => {router.push('/login')})
        }
    }


    return (
        <>
            <div className="add_location_texted">
                <form id="Add_Form_Location">
                    <div className="form-group">
                        <input type="text"  className={ title.length > 2 ? "form-control is-valid" : "form-control" } placeholder="Title - e.g. Home/Office" value={title} onChange={handleTitleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control valid" placeholder="Address" value={props.address.address} onChange={()=>{}} readOnly/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" className={ receiverName.length > 2 ? "form-control is-valid" : "form-control" } placeholder="Receiver Name" value={receiverName} onChange={handleReceiverNameChange}/>
                    </div>
                    <div className="form-group">
                        <div class="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">+880</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Receiver Mobile Number"
                                className={ receiverNumber.length > 0 ? ( validPhoneNumber ? "form-control is-valid" : "form-control is-invalid" ) : "form-control"}
                                value={receiverNumber}
                                onChange={handleReceiverNumberChange}
                            />
                        </div>
                        { validPhoneNumber || (
                            <p className="invalid-feedback d-block ml-2" >Provide a valid Phone Number!</p>
                        )}
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" className={ houseNumber.length > 0 ? "form-control is-valid" : "form-control" } placeholder="House Number" value={houseNumber} onChange={handleHouseNumberChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" className={ floorNumber.length > 0 ? "form-control is-valid" : "form-control" } placeholder="Floor Number" value={floorNumber} onChange={handleFloorNumberChange}/>
                    </div>
                    <div className="form-group">
                        <textarea  className="form-control" placeholder="Note to rider - e.g. floor / directions / landmark#" rows="4" value={note} onChange={handleNoteChange}></textarea>
                    </div>

                    <div className="submits_form">
                        <button className="btn bg-dark" style={{backgroundColor: '#222222 !important'}} onClick={()=> props.setAddAddress(false)}>Cancel</button>
                        <button className="btn button-site" onClick={handleAddAddress}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Add_Info
