import { Row, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from "react";
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

    // Fetch products from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products
                const productsResponse = await axios.get('http://localhost:8000/api/products');
                setProducts(productsResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    // Static categories (since we're only getting products from API)
    const staticCategories = [
        { img: or, name: "monitor", id: 1 },
        { img: c, name: "Web Cam", id: 2 },
        { img: cm, name: "Pc Accessories", id: 3 },
        { img: jeu, name: "Games", id: 4 },
        { img: pro, name: "Processor", id: 5 },
        { img: cg, name: "Graphics Card", id: 6 }
    ];

    // Style definitions
    const iconContainerStyle = {
        backgroundColor: '#000',
        border: '13px solid #ccc',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 10px auto',
    };

    const iconStyle = {
        color: '#fff',
        fontSize: '28px',
    };

    const textCenter = {
        textAlign: 'center',
        marginTop: '30px',
    };

    const boldText = {
        fontWeight: 'bold',
    };

    const sectionTitleStyle = {
        borderLeft: '15px #1E3A8A solid',
        color: '#1E3A8A',
        borderRadius: "3px",
        paddingLeft: "10px",
        marginBottom: "0.5rem"
    };

    if (loading) return <div className="text-center py-5">Loading products...</div>;
    if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

    return ( 
        <>
            {/* Navigation and Slider Section */}
            <Row className=" mb-5">
                <Col className="text-center d-flex flex-column" md={12}>
                    <Slider/>
                </Col>
            </Row>
            
            {/* Flash Sales Section */}
            <Container>
                <Row>
                    <h4 style={sectionTitleStyle}>Today's</h4>
                    <div style={{display:"flex"}}>
                        <h2>Flash Sales </h2>
                        <Countdown />
                    </div>
                    <div className="container py-4 mt-4">
                        <div className="row g-4">
                            {products.slice(0, 8).map((product) => (
                                <div className="col-12 col-sm-6 col-md-3" key={product.id}>
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
                    </div>
                </Row>
            </Container>
            
            {/* Categories Section */}
            <Container>
                <Row>
                    <h4 style={sectionTitleStyle}>
                        Categories
                    </h4>
                    <h2 style={{ marginBottom: "2rem" }}>Browse By Category</h2>
                    
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        gap: "30px",
                        flexWrap: "wrap"
                    }}>
                        {staticCategories.map((category) => (
                            <div 
                                key={category.id}
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "5px",
                                    padding: "30px",
                                    width: '170px',
                                    height: '170px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#FFFFFF'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1E3A8A';
                                    const img = e.currentTarget.querySelector('img');
                                    const text = e.currentTarget.querySelector('p');
                                    if (img) img.style.filter = 'brightness(0) invert(1)';
                                    if (text) text.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                                    const img = e.currentTarget.querySelector('img');
                                    const text = e.currentTarget.querySelector('p');
                                    if (img) img.style.filter = '';
                                    if (text) text.style.color = '';
                                }}
                            >
                                <img 
                                    src={category.img} 
                                    alt={category.name} 
                                    style={{
                                        width: "60px",
                                        height: "auto",
                                        transition: 'filter 0.3s ease'
                                    }}
                                />
                                <p style={{
                                    marginTop: "15px",
                                    marginBottom: "0",
                                    color: "#1F2937",
                                    transition: 'color 0.3s ease'
                                }}>
                                    {category.name}
                                </p>            
                            </div>   
                        ))}
                    </div>     
                </Row>
            </Container>

            {/* Banner Section */}
            <Container 
                style={{ 
                    height: "70vh",
                    width: "80vw",
                    position: 'relative',
                    marginTop: "70px",
                    backgroundImage: `url(${bgo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
            >
                <p style={{
                    color: "#fff", 
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.5)" 
                }}>
                    Shop Our Latest Collection
                </p>
                
                <button 
                    style={{
                        backgroundColor: "transparent",
                        border: "2px solid #28a745",
                        padding: "10px 25px",
                        borderRadius: "4px",
                        position: "absolute",
                        left: "20px",
                        bottom: "20px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        color: "#28a745"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#28a745";
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#28a745";
                    }}
                >
                    Shop Now
                </button>
            </Container>

            {/* All Products Section */}
            <Container className='mt-5'>
                <Row>
                    <h4 style={sectionTitleStyle}>
                        Our Products
                    </h4>
                    <h2 style={{ marginBottom: "2rem" }}>Explore our products</h2>
                    <div className="container py-4 mt-4">
                        <div className="row g-4">
                            {products.map((product) => (
                                <div className="col-12 col-sm-6 col-md-3" key={product.id}>
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
                    </div>
                </Row>
            </Container>

            {/* Features Section */}
            <Container style={{ marginTop: '50px', width:'65%', marginBottom:'50px'}}>
                <Row>
                    <Col md={4} style={textCenter}>
                        <div style={iconContainerStyle}>
                            <i className="bi bi-truck" style={iconStyle}></i>
                        </div>
                        <p style={boldText}>FREE AND FAST DELIVERY</p>
                        <p>Free delivery for all orders over $140</p>
                    </Col>
                    <Col md={4} style={textCenter}>
                        <div style={iconContainerStyle}>
                            <i className="bi bi-headset" style={iconStyle}></i>
                        </div>
                        <p style={boldText}>24/7 CUSTOMER SERVICE</p>
                        <p>Friendly 24/7 customer support</p>
                    </Col>
                    <Col md={4} style={textCenter}>
                        <div style={iconContainerStyle}>
                            <i className="bi bi-shield-check" style={iconStyle}></i>
                        </div>
                        <p style={boldText}>MONEY BACK GUARANTEE</p>
                        <p>We return money within 30 days</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}