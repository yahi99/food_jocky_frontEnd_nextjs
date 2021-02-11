import React from "react";
import Layout from "../src/components/layouts/main";
import {Form, Input} from "antd";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {userRegister} from "../app/slices/user/actions";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {reloadUser} from "../app/slices/user";

function register(props) {
    let router = useRouter()
    let dispatch = useDispatch()
    let user = useSelector(state => state.user)
    if(user.auth) {
        router.push('/').then(()=> {})
    }

    const handleSubmit = async user => {
        user.mobile = "+88" + user.mobile
        let { payload } = await dispatch(userRegister({user}))
        if(payload.error) {
            await Swal.fire('Error', payload.msg, 'error')
        } else {
            await dispatch(reloadUser({}))
            await router.push('/')
        }

    }
    return (
        <Layout>
            <section className="login_main_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="login-form-area">
                                <div className="headin-waise">
                                    <h2>Login</h2>
                                </div>
                                <Form
                                    layout="vertical"
                                    requiredMark={false}
                                    onFinish={handleSubmit}
                                >
                                    <Form.Item
                                        label="First Name"
                                        name="first_name"
                                        rules={[
                                            {required: true, message: 'Please provide your first name'}
                                        ]}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="last_name"
                                        rules={[
                                            {required: true, message: 'Please provide your last name'}
                                        ]}>
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone Number"
                                        name="mobile"
                                        rules={
                                            [
                                                { required: true, message: 'Please input your phone number!' },
                                                { pattern: /\d\d\d\d\d\d\d\d\d\d\d/, message: 'Please input a valid phone number!' }
                                            ]
                                        }
                                    >
                                        <Input addonBefore="+88" maxLength={11}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Email (Optional)"
                                        name="email"
                                        initialValue=""
                                        rules={[
                                            { pattern:  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: 'Please input a valid Email!' }
                                        ]}>
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={
                                            [
                                                { required: true, message: 'Please input your password!' },
                                                { min: 8, message: 'Password must have 8 characters!' }
                                            ]
                                        }>
                                        <Input.Password size="small"/>
                                    </Form.Item>
                                    <div className="button-singup-area">
                                        <div className="form-submit-button">
                                            <button type="submit" className="btn button-site">
                                                Register
                                            </button>
                                        </div>
                                        <div className="create-account">
                                            <Link href="/login" className="pass-for">
                                                Already have an account?
                                            </Link>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
  );
}

export default register;
