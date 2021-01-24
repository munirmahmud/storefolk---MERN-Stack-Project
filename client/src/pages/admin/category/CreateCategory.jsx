import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/Nav/AdminNav';
import { createCategory, getCategories, removeCategory } from '../../../helpers/category';

const CreateCategory = () => {
    const { user } = useSelector((state) => ({...state}));
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategory();
    }, [name]);

    const loadCategory = () => {
        getCategories().then((category) => {
            setCategories(category.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        createCategory({name}, user.token)
            .then((res) => {
                setIsLoading(false);
                setName("");
                toast.success(`${res.data.name} is created.`);
                loadCategory();
            })
            .catch((error) => {
                setIsLoading(false);
                if(error.response.status === 400) {
                    toast.error(error.response.data);
                }
            })
    };

    const handleRemove = (slug) => {
        if(window.confirm("Do you want to delete the category?")) {
            setIsLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setIsLoading(false);
                    toast.success(`${res.data.name} has been deleted.`);
                    loadCategory();
                })
                .catch((error) => {
                    if(error.response.status === 4000) {
                        setIsLoading(false);
                        toast.error(error.response.data);
                    }
                });
        }
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

                    <hr/>

                    <ul className="nav flex-column">
                    {categories.length > 0 && categories.map((cat) => (
                        <li className="alert alert-secondary d-flex justify-content-between" key={cat._id}>
                            <div>{cat.name}</div>
                            <div className="d-flex align-items-center">
                                <DeleteOutlined onClick={() => handleRemove(cat.slug)} className="mr-4 text-danger pointer" />
                                <Link className="line-height-0" to={`/admin/category/${cat.slug}`}>
                                    <EditOutlined />
                                </Link>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default CreateCategory;