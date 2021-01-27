import React, {useEffect, useState} from 'react'
import Sidebar from "../../components/user/sidebar";
import MainLayout from "../../components/layout";
import {Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {fetchUser, userUpdate} from "../../app/slices/user/actions";
import Swal from "sweetalert2";
import {swalLoading} from "../../components/loader/swal-loading";

const profile = () => {
    let router = useRouter()
    let [form] = Form.useForm()
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(user.loaded && !user.auth) {
            router.push('/').then(() => {})
        }
        if(!loaded && user.loaded) {
            setLoaded(true)
            form.setFieldsValue({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: undefined,
                confirm: undefined
            })
        }
    })

    if(!user.auth ) {
        return (
            <MainLayout>
            </MainLayout>
        )
    }

    const handleSubmit = async value => {
        swalLoading()
        let user = {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email || '',
            password: value.password || ''
        }
        let {payload} = await dispatch(userUpdate({user}))
        if(payload.error) {
            await Swal.fire('Error', payload.error, 'error')
        } else {
            await Swal.fire('Success', 'Profile updated successfully', 'success')
            await dispatch(fetchUser({}))
            setLoaded(false)
        }
    }


    return (
        <MainLayout>
            <section id="profile_wrappers">
                <div className="container">
                    <div className="row">
                        <Sidebar/>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                            <div className="profile_setting_form">
                                <h3>Profile</h3>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    requiredMark={false}
                                    onFinish={handleSubmit}
                                >
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="First Name"
                                                    name="first_name"
                                                    rules={[
                                                        {required: true, message: 'Please provide your first name'}
                                                    ]}>
                                                    <Input/>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="Last Name"
                                                    name="last_name"
                                                    rules={[
                                                        {required: true, message: 'Please provide your last name'}
                                                    ]}>
                                                    <Input/>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="Email (Optional)"
                                                    name="email"
                                                    rules={[
                                                        { pattern:  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: 'Please input a valid Email!' }
                                                    ]}>
                                                    <Input/>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h4 className="change_pass_profile">Change Password</h4>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <Form.Item
                                                    label="New Password"
                                                    name="password"
                                                    rules={
                                                        [
                                                            { min: 8, message: 'Password must have 8 characters!' }
                                                        ]
                                                    }>
                                                    <Input.Password size="small"/>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <Form.Item
                                                    name="confirm"
                                                    label="Confirm Password"
                                                    dependencies={['password']}
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if(!value && getFieldValue('password') && getFieldValue('password').length > 7) {
                                                                    return Promise.reject('Please confirm your password!');
                                                                }
                                                                if (!value || getFieldValue('password') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject('The two passwords that you entered do not match!');
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password size="small"/>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="profile_form_button">
                                                <button type="submit" className="btn button-site">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default profile
