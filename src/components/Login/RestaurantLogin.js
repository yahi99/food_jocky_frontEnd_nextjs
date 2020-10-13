import React, {useState} from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Swal from "sweetalert2";
import axios from "axios";
import Router from "next/router";
import PageLoader from "../Common/PageLoader";


function RestaurantLoginArea(props) {

    const Cookies = require('js-cookie');

    const [loading, setLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handlePhoneNumberChange = e => setPhoneNumber(e.currentTarget.value.replace(/ /g,''));
    const handlePasswordChange = e => setPassword(e.currentTarget.value);
    const handleRememberMeChange = e => setRememberMe(!rememberMe);

    async function handleLogin() {
        setLoading(true);
        if(phoneNumber == "" || password == "" ) {
            Swal.fire(
                "Warning",
                "Please fill up all required fields",
                'warning'
            )
        } else {
            let postData = {
                mobile: phoneNumber,
                password: password
            }
            let headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
            let response = await axios.post(`${props.apiUrl}/api/restaurant/login`, postData, {headers});
            console.log(response.data);
            setLoading(false);
            if(response.data.error) {
                Swal.fire(
                    "Error",
                    response.data.msg,
                    'error'
                )
            } else {
                Cookies.set('token', response.data.token);
               // Router.push("/");
            }
        }
    }

    return (
        <>
            <PageLoader loading={loading}/>
            <section className="login_main_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="login-form-area">
                                <div className="headin-waise">
                                    <h2>Login</h2>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            className="form-control"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form-control"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="remember-password">
                                        <div className="custom-select-boxed">
                                            <label className="check ">
                                                Remember me
                                                <input type="checkbox" name="is_name" checked={rememberMe} onChange={handleRememberMeChange}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="forgot-password">
                                            <Link href="/#" className="pass-for">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="button-singup-area">
                                        <div className="form-submit-button">
                                            <button type="button" class="btn button-site" onClick={handleLogin}>
                                                Login
                                            </button>
                                        </div>
                                        <div className="create-account">
                                            <Link href="/add_restaurant_form" className="pass-for">
                                                Create new restaurant ?
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                                <div className="social-login">
                                    <Link href="/">
                                        <FaFacebookF></FaFacebookF>
                                    </Link>
                                    <Link href="/">
                                        <FaTwitter></FaTwitter>
                                    </Link>
                                    <Link href="/">
                                        <FaLinkedinIn></FaLinkedinIn>
                                    </Link>
                                    <Link href="/">
                                        <SiGmail></SiGmail>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};



export default RestaurantLoginArea;
