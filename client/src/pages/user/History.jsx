import React from 'react';
import UserNav from '../../components/Nav/UserNav';

const History = () => {
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>

                <div className="col">
                    <h3>User Dashboard</h3>
                </div>

            </div>
        </div>
    )
}

export default History;
