import React, { useState, useEffect } from 'react';
import api from '../components/services/api';
import Product from '../components/product';

function CategoryProducts({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response;
                switch(category) {
                    case 'ORDINATEUR':
                        response = await api.getLaptops();
                        break;
                    case 'TABLETTE_GRAPHIQUE':
                        response = await api.getTablets();
                        break;
                    case 'IMPRIMANTE':
                        response = await api.getPrinters();
                    case 'ECRAN':
                            response = await api.getMonitors();
                    case 'CLAVIER':
                        response = await api.getKeyboards();
                    case 'SOURIS':
                        response = await api.getMice();
                    case 'stockage':
                        response = await api.getStorage();
                    default:
                        throw new Error('Invalid category');
                }
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="row">
            {products.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );
}

export default CategoryProducts;