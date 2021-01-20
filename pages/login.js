import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
import { Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {userLogin} from "../app/slices/user/actions";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {reloadUser} from "../app/slices/user";

const Login = () => {
    let router = useRouter()
    let dispatch = useDispatch()
    const handleSubmit = async value => {
        let { payload } = await dispatch(userLogin({...value}))
        if(payload.error) {
            await Swal.fire('Error', payload.msg, 'error')
        } else {
            await router.push('/')
            dispatch(reloadUser({}))
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
                                        label="Phone Number"
                                        name="phone"
                                        rules={
                                            [
                                                { required: true, message: 'Please input your phone number!' },
                                                { pattern: /\d\d\d\d\d\d\d\d\d\d/, message: 'Please input a valid phone number!' }
                                            ]
                                        }
                                    >
                                        <Input addonBefore="+880" maxLength={10}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password size="small"/>
                                    </Form.Item>
                                    {/*<div className="remember-password">*/}
                                    {/*    <div>*/}

                                    {/*    </div>*/}
                                    {/*    <div className="forgot-password">*/}
                                    {/*        <Link href="/#" className="pass-for">*/}
                                    {/*            Forgot Password?*/}
                                    {/*        </Link>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="button-singup-area">
                                        <div className="form-submit-button">
                                            <button type="submit" className="btn button-site">
                                                Login
                                            </button>
                                        </div>
                                        <div className="create-account">
                                            <Link href="/register" className="pass-for">
                                                Create Account ?
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

export default Login;
