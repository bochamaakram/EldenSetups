import { Row, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 

import Slider from '../components/Slider';
import Countdown from '../components/countdown';
import ProductCard from '../components/product';
import bgo from "../images/bgo.jpg";

// Category icons
import or from "../images/icons/ordinateur (1).png";
import c from "../images/icons/camera.png";
import cm from "../images/icons/casque-de-musique.png";
import jeu from "../images/icons/jeu.png";
import pro from "../images/icons/processeur.png";
import cg from "../images/icons/carte-graphique.png";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    const staticCategories = [
        { img: or, name: "Monitor", id: 1 },
        { img: c, name: "Web Cam", id: 2 },
        { img: cm, name: "PC Accessories", id: 3 },
        { img: jeu, name: "Games", id: 4 },
        { img: pro, name: "Processor", id: 5 },
        { img: cg, name: "Graphics Card", id: 6 }
    ];

    if (loading) return <div className="text-center py-5">Loading products...</div>;
    if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

    return (
        <div className="home-page">
            {/* Slider */}
            <section className="mb-5">
                <Slider />
            </section>

            {/* Flash Sales */}
            <Container className="mb-5">
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between mb-4">
                    <div>
                        <h4 className="section-title">Today's</h4>
                        <h2 className="mb-3 mb-md-0">Flash Sales</h2>
                    </div>
                    <Countdown />
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {products.slice(0, 8).map(product => (
                        <div className="product-card" key={product.id} onClick={() => navigate(`/Details/${product.id}`)}>
                            <ProductCard
                                product={product}
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                category={product.category}
                                stock={product.stock}
                                image={product.image}
                            />
                        </div>
                    ))}
                </div>
            </Container>

            {/* Categories */}
            <Container className="my-5">
                <h4 className="section-title">Categories</h4>
                <h2 className="mb-4">Browse By Category</h2>
                <Row className="justify-content-center g-4">
                    {staticCategories.map(category => (
                        <Col xs={6} sm={4} md={3} lg={2} key={category.id}>
                            <div className="category-card" onClick={() => navigate(`/products`)}>
                                <img src={category.img} alt={category.name} className="category-img" />
                                <p className="category-name">{category.name}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Promo Banner */}
            <Container className="my-5">
                <div className="promo-banner">
                    <p className="promo-text">Shop Our Latest Collection</p>
                    <button className="promo-button" onClick={() => navigate('/products')}>Shop Now</button>
                </div>
            </Container>

            {/* All Products */}
            <Container className="my-5">
                <h4 className="section-title">Our Products</h4>
                <h2 className="mb-4">Explore our products</h2>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {products.map(product => (
                        <div className="product-card" key={product.id} onClick={() => navigate(`/Details/${product.id}`)}>
                            <ProductCard
                                product={product}
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                category={product.category}
                                stock={product.stock}
                                image={product.image}
                            />
                        </div>
                    ))}
                </div>
            </Container>

            {/* Features */}
            <Container className="my-5">
                <Row className="g-4 text-center">
                    <Col md={4}>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-truck"></i>
                            </div>
                            <h5>FREE AND FAST DELIVERY</h5>
                            <p>Free delivery for all orders over $140</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-headset"></i>
                            </div>
                            <h5>24/7 CUSTOMER SERVICE</h5>
                            <p>Friendly 24/7 customer support</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h5>MONEY BACK GUARANTEE</h5>
                            <p>We return money within 30 days</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Embedded Styles */}
            <style jsx="true">{`
                .section-title {
                    border-left: 15px solid #1E3A8A;
                    color: #1E3A8A;
                    padding-left: 10px;
                    margin-bottom: 0.5rem;
                }
                .product-card {
                    width: 250px;
                }
                .category-card {
                    border: 1px solid #E5E7EB;
                    border-radius: 5px;
                    padding: 30px 15px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background-color: #FFFFFF;
                    height: 100%;
                }
                .category-card:hover {
                    background-color: #1E3A8A;
                }
                .category-card:hover .category-img {
                    filter: brightness(0) invert(1);
                }
                .category-card:hover .category-name {
                    color: white;
                }
                .category-img {
                    width: 60px;
                    transition: filter 0.3s ease;
                }
                .category-name {
                    margin-top: 15px;
                    font-size: 0.9rem;
                    color: #1F2937;
                }
                .promo-banner {
                    height: 300px;
                    background: url(${bgo}) center/cover no-repeat;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px;
                    position: relative;
                }
                .promo-text {
                    color: #fff;
                    font-size: 1.5rem;
                    font-weight: bold;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
                    max-width: 60%;
                }
                .promo-button {
                    background-color: transparent;
                    border: 2px solid #28a745;
                    padding: 10px 25px;
                    border-radius: 4px;
                    position: absolute;
                    left: 20px;
                    bottom: 20px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    color: #28a745;
                    transition: all 0.3s ease;
                }
                .promo-button:hover {
                    background-color: #28a745;
                    color: #fff;
                }
                .feature-card {
                    padding: 20px;
                    background-color: #fff;
                }
                .feature-icon {
                    background-color: #000;
                    border: 13px solid #ccc;
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto 10px auto;
                }
                .feature-icon i {
                    color: #fff;
                    font-size: 28px;
                }
                @media (max-width: 768px) {
                    .promo-banner {
                        height: 200px;
                    }
                    .promo-text {
                        font-size: 1.2rem;
                        max-width: 100%;
                    }
                    .category-card {
                        padding: 15px 10px;
                    }
                }
            `}</style>
        </div>
    );
}
