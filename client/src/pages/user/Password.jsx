import React from 'react';
import UserNav from '../../components/Nav/UserNav';

const Password = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <h3>Menus</h3>
                    <UserNav />
                </div>

                <div className="col">
                    Update Your Password
                </div>

            </div>
        </div>
    )
}

export default Password;
