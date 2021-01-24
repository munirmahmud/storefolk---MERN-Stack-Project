import React from 'react';
import AdminNav from '../../../components/Nav/AdminNav';

const CreateCategory = () => {
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">
                    <h3>Create Category</h3>
                </div>

            </div>
        </div>
    )
}

export default CreateCategory;
