import React, { useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import {UrqlClient} from "../urql/urql-provider";
import Cookies from 'js-cookie'
import {useQuery} from "urql";
import {RiDeleteBinLine} from "react-icons/ri";
import Swal from "sweetalert2";

const Add_Address = props => {

    return (
        <>
            <div className="col-lg-6">
                <div className="Add_add_modals"  onClick={props.handleClick} style={{height: 250, paddingTop: 80}}>
                    <a href="#!"><AiOutlinePlus/></a>
                    <h4>Add address</h4>
                </div>
            </div>

        </>
    )
}

export default Add_Address


export const addAAddress = async address => {
    let query = `
        mutation($address: CustomerAddress) {
            addCustomerLocation(customerAddress: $address) {
                error
                msg
            }
        }
    `
    let client = UrqlClient(Cookies.get('token'));
    let result = await client.mutation(query, {address}).toPromise();
    if(result.error ) {
        return {
            error: true,
            msg: 'Request Failed ! Check you internet connection'
        }
    } else {
        return {
            error: result.data.addCustomerLocation.error,
            msg: result.data.addCustomerLocation.msg
        }
    }
}


export const GetAllAddress = props => {

    let query = `
        query {
            getAllCustomerLocations {
                error
                msg
                data {
                    _id
                    title
                    address {
                        address
                        location {
                            lat
                            lng
                        }
                    }
                    reciver_name
                    reciver_mobile_no
                    house_no
                    floor_no
                    note_to_rider
                }
            }   
        }   
    `
    const [res, reExecuteQuery] = useQuery({query});

    const handleDelete = async id => {
        let result = await deleteAAddress(id);
        if(result.error) {
            Swal.fire('Error', result.msg, 'error')
        } else {
            Swal.fire('Success', 'Successfully deleted address' , 'success')
        }
        refresh();
    }

    const refresh = () => {
        reExecuteQuery({ requestPolicy: 'network-only' });
    };

    if (res.fetching) return <></>;
    if (res.error) return <></>;

    let locations =  res.data.getAllCustomerLocations.data || [];
    return (
        <>
            {locations.map((location, index) => (
                <div className="col-lg-6">
                    <div className="add_location_area" style={{border: (props.location && location._id == props.location._id) ? '1px solid limegreen': 'none'}} onClick={()=> props.setLocation(location)}>
                        <div className="add_texted">
                            <h6>{location.title}</h6>
                            <p>{location.address.address}</p>
                            <p>{location.reciver_name + ", " + location.reciver_mobile_no}</p>
                            <p>{location.floor_no + ", " + location.house_no}</p>
                            <span>Note to rider: {location.note_to_rider.length > 0 ? location.note_to_rider : 'none'}</span>
                        </div>
                        <div className="icon_area_edite">
                            <RiDeleteBinLine onClick={ e=> handleDelete(location._id)}/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )

}


export const deleteAAddress = async id => {
    let query = `
        mutation($id: ID) {
            deleteCustomerLocation(_id: $id) {
                error
                msg
            }
        }
    `
    let client = UrqlClient(Cookies.get('token'));
    let result = await client.mutation(query, {id}).toPromise();
    if(result.error ) {
        return {
            error: true,
            msg: 'Request Failed ! Check you internet connection'
        }
    } else {
        return {
            error: result.data.deleteCustomerLocation.error,
            msg: result.data.deleteCustomerLocation.msg
        }
    }
}
