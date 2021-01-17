import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../config/firebase';


const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: user.email,
                  token: idTokenResult.token,
                }
              });

              history.push("/");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        await auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: user.email,
                  token: idTokenResult.token,
                }
            });

            history.push("/");
        }).catch((error) => {
            toast.error(error.message);
            console.log(error.message);
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3 mt-5">
                    {loading ? <h3 className="text-center danger">Login...</h3> : <h3 className="text-center">Login</h3>}

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
                        <div className="form-group">
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your Password"
                            />
                        </div>

                        <Button 
                        type="primary" 
                        onClick={handleSubmit}
                        block
                        shape="round"
                        icon={<MailOutlined />}
                        size="large"
                        disabled={!email || password.length < 6}
                        >Login with Email/Password</Button>
                    </form>

                    <Button 
                        type="primary"
                        onClick={googleLogin}
                        block
                        shape="round"
                        size="large"
                        danger
                        icon={<GoogleOutlined />}
                        >Login with Google</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;