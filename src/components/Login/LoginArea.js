import React, {useState} from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import Router from "next/router";


function LoginArea(props) {

    const Cookies = require('js-cookie');
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    function handlePhoneNumberChange(e) {
        let number = e.currentTarget.value.replace(/\D/g,'');
        setPhoneNumber(number);
        phoneNumberValidityCheck(number);
    }
    const handlePasswordChange = e => setPassword(e.currentTarget.value);
    const handleRememberMeChange = e => setRememberMe(!rememberMe);

    function phoneNumberValidityCheck(number) {
        if( number.length > 0 && number.length !== 10) {
            setValidPhoneNumber(false);
        } else {
            setValidPhoneNumber(true);
        }
    }

    async function handleLogin() {
        if(phoneNumber == "" || password == "" || (!validPhoneNumber) ) {
            Swal.fire(
                "Warning",
                "Please fill up all required fields",
                'warning'
            )
        } else {
            let postData = {
                mobile: "+880" + phoneNumber,
                password: password
            }
            let response = await axios.post(`${props.apiUrl}/api/customer/login`, postData);
            if(response.data.error) {
                Swal.fire(
                    "Error",
                    response.data.msg,
                    'error'
                )
            } else {
                Cookies.set('token', response.data.token);
                Router.back();
            }
        }
    }

    return (
        <>
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
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">+880</span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Phone Number"
                                                className={ phoneNumber.length > 0 ? ( validPhoneNumber ? "form-control is-valid" : "form-control is-invalid" ) : "form-control"}
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                            />
                                        </div>
                                        { validPhoneNumber || (
                                            <p className="invalid-feedback d-block ml-2" >Not valid phone number</p>
                                        )}
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
                                            <Link href="/register" className="pass-for">
                                                Create Account ?
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};



export default LoginArea;
