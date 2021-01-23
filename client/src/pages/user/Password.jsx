import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserNav from '../../components/Nav/UserNav';
import { auth } from '../../config/firebase';

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(auth);

        await auth.currentUser.updatePassword(password)
            .then((res) => {
                setLoading(false);

                setPassword("");
                toast.success('Your password updated successfully.');
                console.log(res);
            }).catch(error => {
                setLoading(false);
                toast.error(error.message)
                console.log(error.message);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <h3>Menus</h3>
                    <UserNav />
                </div>

                <div className="col">
                    {loading ? 
                        <h4 className="mb-4">Loading...</h4> 
                    : 
                        <h4 className="mb-4">Update Password</h4>
                        }
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">Your New Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <button type="submit" disabled={!password || password.length < 6 || loading} className="btn primary">Update</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Password;
