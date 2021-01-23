import { MailOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendPasswordResetEmail(email, config).then((user) => {
            setEmail("");
            setLoading(false);
            toast.success("Check your email for password reset link.");
        }).catch((error) => {
            console.log(error);
            toast.error(error.message);
        });

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3 mt-5">
                {loading ? <h3 className="text-center danger">Checking...</h3> : <h3 className="text-center">Forgot Password?</h3>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                autoFocus
                            />
                        </div>

                        <button 
                        type="submit" 
                        icon={<MailOutlined />}
                        disabled={!email}
                        className="btn btn-raised"
                        >Reset Your Password</button>
                    </form>

                    <Link to="/register" className="float-right text-danger">Need an account</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;