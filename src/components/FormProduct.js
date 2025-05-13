import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:8000/api';

export default function AddProduct() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        catégorie: '',
        subCatégorie: '',
        description: '',
        price: '',
        rating: '',
        stock: '',
        image: null,
        specs: [{ key: '', value: '' }]
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'image' ? files[0] : value
        });
    };

    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...formData.specs];
        updatedSpecs[index][field] = value;
        setFormData({ ...formData, specs: updatedSpecs });
    };

    const addSpecRow = () => {
        setFormData({
            ...formData,
            specs: [...formData.specs, { key: '', value: '' }]
        });
    };

    const removeSpecRow = (index) => {
        if (formData.specs.length > 1) {
            const updatedSpecs = formData.specs.filter((_, i) => i !== index);
            setFormData({ ...formData, specs: updatedSpecs });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!currentUser) {
            navigate('/login');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('catégorie', formData.catégorie);
            formDataToSend.append('subCatégorie', formData.subCatégorie);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('rating', formData.rating);
            formDataToSend.append('stock', formData.stock);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
            formDataToSend.append('specs', JSON.stringify(formData.specs));

            await axios.post(`${API_BASE_URL}/products`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/admin/products');
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate('/login');
            } else if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error adding product:', error);
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="card admin-card w-75 mx-auto mt-4">
            <div className="card-header">
                <h5 className="mb-0">Add New Product</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Product Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category <span className="text-danger">*</span></label>
                            <select
                                className={`form-select ${errors.catégorie ? 'is-invalid' : ''}`}
                                name="catégorie"
                                value={formData.catégorie}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Desktop PC">Desktop PC</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Components">Components</option>
                                <option value="Peripherals">Peripherals</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                            {errors.catégorie && <div className="invalid-feedback">{errors.catégorie[0]}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Subcategory</label>
                            <input
                                type="text"
                                className={`form-control ${errors.subCatégorie ? 'is-invalid' : ''}`}
                                name="subCatégorie"
                                value={formData.subCatégorie}
                                onChange={handleChange}
                            />
                            {errors.subCatégorie && <div className="invalid-feedback">{errors.subCatégorie[0]}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Image <span className="text-danger">*</span></label>
                            <input
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image[0]}</div>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description <span className="text-danger">*</span></label>
                        <textarea
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description[0]}</div>}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Price (DH) <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price[0]}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Stock <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                min="0"
                                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                            {errors.stock && <div className="invalid-feedback">{errors.stock[0]}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                className="form-control"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save me-2"></i> Save Product
                    </button>
                </form>
            </div>
        </div>
    );
}