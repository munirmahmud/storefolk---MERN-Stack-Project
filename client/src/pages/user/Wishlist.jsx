import React from 'react';
import UserNav from '../../components/Nav/UserNav';

const Wishlist = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <h3>Menus</h3>
                    <UserNav />
                </div>

                <div className="col">
                    Your Wishlist
                </div>

            </div>
        </div>
    )
}

export default Wishlist;
