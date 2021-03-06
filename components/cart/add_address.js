import React, {useEffect, useRef, useState} from "react";
import {Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addDeliveryAddress, fetchDeliveryAddresses} from "../../app/slices/order/actions";
import Swal from "sweetalert2";

const AddAddress = ({address, setAddAddress}) => {
    let user = useSelector(state => state.user)
    let [form] = Form.useForm()
    const [loaded, setLoaded ] = useState(false)
    useEffect(() => {
        if(!loaded) {
            setLoaded(true)
            form.setFieldsValue({
                reciver_name: user.first_name + " " + user.last_name,
                reciver_mobile_no: user.mobile.replace('+880', ''),
                address: address.address
            })
        }
    })
    const clearName = () => {
        form.setFieldsValue({
            reciver_name: null
        })
    }

    const clearMobile = () => {
        form.setFieldsValue({
            reciver_mobile_no: null
        })
    }

    let dispatch = useDispatch()
    const handleSubmit = async value => {
        let newAddress = {
            title: value.title,
            address: address,
            reciver_mobile_no: "+880" + value.reciver_mobile_no ,
            reciver_name: value.reciver_name ,
            house_no: value.house_no || '',
            floor_no: value.floor_no || '',
            note_to_rider: value.note_to_rider || ''
        }
        let {payload} = await dispatch(addDeliveryAddress({address: newAddress}))
        if(payload.error) {
            await Swal.fire('Error', payload.msg, 'error')
        } else {
            await Swal.fire('Success', payload.msg, 'success')
            dispatch(fetchDeliveryAddresses({}))
            setAddAddress(false)
        }
    }

    const handleCancel = () => {
        setAddAddress(false)
        setTimeout(() => {
            window.scrollTo({ top: 700, left: 0, behavior: "smooth" })
        }, 500)
    }

    return (
        <div className="add_location_texted p-5">
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                onFinish={handleSubmit}
                id="Add_Form_Location">
                <Form.Item
                    label="Title - e.g. Home/Office"
                    name="title"
                    rules={[
                        {required: true, message: 'Please provide title of address'}
                    ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Receiver Name"
                    name="reciver_name"
                    rules={[
                        {required: true, message: 'Please provide receiver name'}
                    ]}>
                    <Input suffix={<a onClick={clearName} style={{color: "red"}}>Clear</a>} />
                </Form.Item>
                <Form.Item
                    label="Receiver Phone Number"
                    name="reciver_mobile_no"
                    rules={
                        [
                            { required: true, message: 'Please input receiver phone number!' },
                            { pattern: /\d\d\d\d\d\d\d\d\d\d/, message: 'Please input a valid phone number!' }
                        ]
                    }>
                    <Input addonBefore="+880"  suffix={<a onClick={clearMobile} style={{color: "red"}}>Clear</a>} maxLength={10}/>
                </Form.Item>

                <Form.Item
                    label="House No"
                    name="house_no">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Floor No"
                    name="floor_no">
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Note to Rider"
                    name="note_to_rider">
                    <Input.TextArea autoSize={{minRows: 4, maxRows: 10}}/>
                </Form.Item>

                <div className="submits_form">
                    <button className="btn bg-dark" type="button" style={{backgroundColor: '#222222 !important'}} onClick={handleCancel}>Cancel</button>
                    <button className="btn button-site" type="submit">Submit</button>
                </div>

            </Form>
        </div>
    )
}

export default AddAddress