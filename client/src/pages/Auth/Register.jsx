import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h3 className="text-center">Register</h3>

                    <form onSubmit={handleSubmit}>
                        <input type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />

                        <button type="submit" className="btn btn-raised">Register</button>
                    </form>

                    {/* {registerForm()} */}
                </div>
            </div>
        </div>
    );
};

export default Register;