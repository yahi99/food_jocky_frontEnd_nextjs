import React, {useState} from "react";
import Link from "next/link";
import Swal from "sweetalert2";

function Register() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = e => setName(e.currentTarget.value);
    const handlePhoneNumberChange = e => setPhoneNumber(e.currentTarget.value.replace(/ /g,''));
    const handleEmailChange = e => setEmail(e.currentTarget.value);
    const handlePasswordChange = e => setPassword(e.currentTarget.value);

    function handleRegister() {
        if(name == "" || phoneNumber == "" || password == "" ) {
            Swal.fire(
                "Warning",
                "Please fill up all required fields",
                'warning'
            )
        } else {
            console.log(name, email, phoneNumber, password)
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
                                        <input
                                            type="text"
                                            placeholder="Mobile Number"
                                            className="form-control"
                                            value={phoneNumber}
                                            onChange={handlePhoneNumberChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="Email Address"
                                            className="form-control"
                                            value={email}
                                            onChange={handleEmailChange}
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
