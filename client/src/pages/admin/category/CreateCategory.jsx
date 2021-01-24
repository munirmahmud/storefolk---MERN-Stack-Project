import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/Nav/AdminNav';
import { createCategory } from '../../../helpers/category';

const CreateCategory = () => {
    const { user } = useSelector((state) => ({...state}));
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        createCategory({name}, user.token)
            .then((res) => {
                setIsLoading(false);
                setName("");
                toast.success(`${res.data.name} is created.`);
            })
            .catch((error) => {
                setIsLoading(false);
                if(error.response.status === 400) {
                    toast.error(error.response.data);
                }
            })
    };

    return (
        <div className="container mt-5">
            <div className="row">
                
                <div className="col-md-3">
                    <AdminNav />
                </div>

                <div className="col">
                    <h3 className="text-center mb-4">Create a new category</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="categoryName">Category Name</label>
                            <input 
                                type="text"
                                id="categoryName"
                                className="form-control"
                                placeholder="Create a new category"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                required
                                />

                        </div>
                        <button type="submit" disabled={name.length < 3} className="btn btn-outline-primary">Save</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateCategory;
