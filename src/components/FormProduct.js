import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddProduct() {
    const navigate = useNavigate();
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
        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('catégorie', formData.catégorie);
            formDataToSend.append('subCatégorie', formData.subCatégorie);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('rating', formData.rating);
            formDataToSend.append('stock', formData.stock);
            formDataToSend.append('image', formData.image);
            
            formData.specs.forEach((spec, index) => {
                formDataToSend.append(`specs[keys][${index}]`, spec.key);
                formDataToSend.append(`specs[values][${index}]`, spec.value);
            });

            await axios.post('/api/admin/products', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            navigate('/admin/products');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="card admin-card w-75 d-flex justify-content-between">
            <div className="card-header">
                <h5 className="mb-0">Add New Product</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Product Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name[0]}</div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="catégorie" className="form-label">
                                    Catégorie <span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-select ${errors.catégorie ? 'is-invalid' : ''}`}
                                    id="catégorie"
                                    name="catégorie"
                                    value={formData.catégorie}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Catégorie</option>
                                    <option value="Desktop PC">Desktop PC</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Components">Components</option>
                                    <option value="Peripherals">Peripherals</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                                {errors.catégorie && (
                                    <div className="invalid-feedback">{errors.catégorie[0]}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="subCatégorie" className="form-label">
                                    Sous-catégorie
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.subCatégorie ? 'is-invalid' : ''}`}
                                    id="subCatégorie"
                                    name="subCatégorie"
                                    value={formData.subCatégorie}
                                    onChange={handleChange}
                                />
                                {errors.subCatégorie && (
                                    <div className="invalid-feedback">{errors.subCatégorie[0]}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            id="description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description[0]}</div>
                        )}
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price (DH) <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.price && (
                                    <div className="invalid-feedback">{errors.price[0]}</div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">
                                    Stock <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                    id="stock"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.stock && (
                                    <div className="invalid-feedback">{errors.stock[0]}</div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Product Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                                {errors.image && (
                                    <div className="invalid-feedback">{errors.image[0]}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save me-2"></i> Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}