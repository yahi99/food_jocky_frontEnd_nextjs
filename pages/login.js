import React, {useState} from "react";
import Layout from "../components/layout";
import Link from "next/link";
import {Button, Form, Input} from "antd";

function login(props) {
    const [phoneNumber, setPhoneNumber] = useState("");
    function handlePhoneNumberChange(e) {
        let number = e.currentTarget.value.replace(/\D/g,'');
        setPhoneNumber(number);
    }

    const handleSubmit = () => {

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
                                        name="username"
                                        rules={
                                            [
                                                { required: true, message: 'Please input your phone number!' },
                                                { pattern: /\d*/, message: 'Please input valid phone number!' }
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

export default login;
