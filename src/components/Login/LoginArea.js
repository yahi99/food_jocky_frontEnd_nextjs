import React, {useState} from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Swal from "sweetalert2";

function LoginArea() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleNameChange = e => setName(e.currentTarget.value);
    const handlePasswordChange = e => setPassword(e.currentTarget.value);
    const handleRememberMeChange = e => setRememberMe(!rememberMe);


    function handleLogin() {
        if(name == "" || password == "" ) {
            Swal.fire(
                "Warning",
                "Please fill up all required fields",
                'warning'
            )
        } else {
            console.log(name, password)
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
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="name"
                                            className="form-control"
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="password"
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

export default LoginArea;
