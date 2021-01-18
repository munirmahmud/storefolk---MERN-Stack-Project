import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';
import { createOrUpdateUser } from '../../helpers';



const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let dispatch = useDispatch();

    useEffect(() => {
        // Get the email from the localstorage
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if(password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);

            if(result.user.emailVerified) {
                // Remove email from localstorage
                window.localStorage.removeItem('emailForRegistration');

                // Get user ID token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            _id: res.data._id,
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                        }
                    });
                })
                .catch((error) => {});
                
                //Redirect
                history.push("/");
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3 mt-5">
                    <h3 className="text-center mb-5">Complete Registration</h3>

                    <form onSubmit={handleSubmit}>
                        <input type="email"
                            className="form-control mb-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                        <input type="password"
                            className="form-control mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            autoFocus
                        />

                        <button type="submit" className="btn btn-raised">Complete Registration</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;