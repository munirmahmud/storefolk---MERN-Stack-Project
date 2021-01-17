import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';

const Register = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === "") return;

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config);

        // Show to success message to the user
        toast.success(`An email is sent to ${email}. Please click the link to complete your registration.`);

        // Save email in localstorage
        window.localStorage.setItem('emailForRegistration', email);

        // Remove the existing value
        setEmail("");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3 mt-5">
                    <h3 className="text-center">Register</h3>

                    <form onSubmit={handleSubmit}>
                        <input type="email"
                            className="form-control mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />

                        <button type="submit" className="btn btn-raised">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;