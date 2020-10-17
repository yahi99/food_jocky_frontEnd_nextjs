import React, {useState} from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import Router from "next/router";

function Register(props) {

    const Cookies = require('js-cookie');

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = e => setName(e.currentTarget.value);
    const [validPassword, setValidPassword] = useState(true);
    const handlePasswordChange = e => {
        let password = e.currentTarget.value;
        setPassword(password);
        if(password.length < 8) {
            setValidPassword(false);
        } else {
            setValidPassword(true);
        }
    }

    const [validEmail, setValidEmail] = useState(true);
    const handleEmailChange = e => {
        let email = e.currentTarget.value;
        setEmail(email);
        emailValidityCheck(email);
    }
    function emailValidityCheck(email) {
        if(email.length == 0 ) {
            setValidEmail(true);
        } else {
            let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            setValidEmail(reg.test(email));
        }
    }


    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    function handlePhoneNumberChange(e) {
        let number = e.currentTarget.value.replace(/\D/g,'');
        setPhoneNumber(number);
        phoneNumberValidityCheck(number);
    }


    function phoneNumberValidityCheck(number) {
        if( number.length > 0 && number.length !== 10) {
            setValidPhoneNumber(false);
        } else {
            setValidPhoneNumber(true);
        }
    }

    async function handleRegister() {
        if(name == "" || phoneNumber == "" || password == "" || (!validPhoneNumber) || (!validPassword) || (!validEmail)) {
            Swal.fire(
                "Warning",
                "Please fill up all required fields",
                'warning'
            )
        } else {
            let postData = {
                full_name: name,
                mobile: "+880" +  phoneNumber,
                email: email,
                password: password
            }
            let response = await axios.post(`${props.apiUrl}/api/customer/create`, postData);
           // console.log(response.data);
            if(response.data.error) {
                Swal.fire(
                    "Error",
                    response.data.msg,
                    'error'
                )
            } else {
                Cookies.set('token', response.data.token);
                Router.push("/");
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
                                    <h2>Register</h2>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="form-control"
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Number</label>
                                        <div class="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">+880</span>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Mobile Number"
                                                className={ phoneNumber.length > 0 ? ( validPhoneNumber ? "form-control is-valid" : "form-control is-invalid" ) : "form-control"}
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                            />
                                        </div>
                                        { validPhoneNumber || (
                                            <p className="invalid-feedback d-block ml-2" >Provide a valid Phone Number!</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Email (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="Email Address"
                                            className={ email.length > 0 ? ( validEmail ? "form-control is-valid" : "form-control is-invalid" ) : "form-control"}
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        { validEmail || (
                                            <p className="invalid-feedback d-block ml-2" >Provide a valid Phone Number!</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="password"
                                            className={ password.length > 0 ? ( validPassword ? "form-control is-valid" : "form-control is-invalid" ) : "form-control"}
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        { validPassword || (
                                            <p className="invalid-feedback d-block ml-2" >Password must have 8 characters!</p>
                                        )}
                                    </div>
                                    <div className="button-singup-area">
                                        <div className="form-submit-button">
                                            <button type="button" className="btn button-site" onClick={handleRegister}>
                                                Register
                                            </button>
                                        </div>
                                        <div className="create-account">
                                            <Link href="/login" className="pass-for">
                                                Alredy have an account?
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
}

export default Register;
