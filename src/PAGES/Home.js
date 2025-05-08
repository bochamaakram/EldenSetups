import { Row, Col, Container } from 'react-bootstrap';
import c1 from "../images/utilisateur-actif (1).png";
import c2 from "../images/ecran.png";
import c3 from "../images/chariot (1).png";
import { useEffect, useState } from "react";
import axios from "axios"; 
import Slider from '../components/Slider';
import Countdown from '../components/countdown';
import or from "../images/icons/ordinateur (1).png";
import c from "../images/icons/camera.png";
import cm from "../images/icons/casque-de-musique.png";
import jeu from "../images/icons/jeu.png";
import pro from "../images/icons/processeur.png";
import cg from "../images/icons/carte-graphique.png";
import bgo from "../images/bgo.jpg";
import { Spinner } from 'react-bootstrap';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // API call
    useEffect(() => {
        if (selectedType) {
            setLoading(true);
            setError(null);
            axios.get(`http://localhost:8000/api/products/${selectedType}`)
                .then((response) => {
                    setProducts(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setError("Failed to load products. Please try again.");
                    setLoading(false);
                });
        }
    }, [selectedType]);

    const handleCategoryClick = (categoryName) => {
        setSelectedType(categoryName);
    };

    const categories = [
        { img: or, name: "moniteur" },
        { img: c, name: "Web Cam" },
        { img: cm, name: "Pc Accessories" },
        { img: jeu, name: "Games" },
        { img: pro, name: "Processor" },
        { img: cg, name: "Graphics Card" }
    ];    

    return ( 
        <>
            <Row>
                <Col className="text-center mt-5 mb-5 d-flex flex-column " md={3}>
                    <ul style={{listStyleType:"none", padding:"0" ,marginLeft:"100px"}}>
                        <li><a href="/" style={{textDecoration:"none", color:"black" ,display:'flex',justifyContent:'start'}}>Pc Accessories</a></li>
                        <li><a href="/" style={{textDecoration:"none", color:"black",display:'flex',justifyContent:'start'}}>Pc Components</a></li>
                        <li><a href="/" style={{textDecoration:"none", color:"black",display:'flex',justifyContent:'start'}}>Build your Pc</a></li>
                    </ul>
                </Col>
                <Col className="text-center mt-5 mb-5 d-flex flex-column " md={9}>
                    <Slider/>
                </Col>
            </Row>

            <Container>
                <Row>
                    <h4 style={{borderLeft:'15px #1E3A8A solid',color:'#1E3A8A',borderRadius:"3px"}}>Today's</h4>
                    <div style={{display:"flex"}}>
                        <h2>Flash Sales </h2>
                        <Countdown />
                    </div>
                </Row>
            </Container>

            <Container>
                <Row>
                    <h4 style={{
                        borderLeft: '15px #1E3A8A solid',
                        color: '#1E3A8A',
                        borderRadius: "3px",
                        paddingLeft: "10px",
                        marginBottom: "0.5rem"
                    }}>
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
                        {categories.map((category, index) => (
                            <div 
                                key={index}
                                onClick={() => handleCategoryClick(category.name)}
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
                                    e.currentTarget.querySelector('img').style.filter = 'brightness(0) invert(1)';
                                    e.currentTarget.querySelector('p').style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                                    e.currentTarget.querySelector('img').style.filter = '';
                                    e.currentTarget.querySelector('p').style.color = '';
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

            {/* Products Display Section */}
            {selectedType && (
                <Container style={{ marginTop: "50px" }}>
                    <h4 style={{
                        borderLeft: '15px #1E3A8A solid',
                        color: '#1E3A8A',
                        borderRadius: "3px",
                        paddingLeft: "10px",
                        marginBottom: "1rem"
                    }}>
                        {selectedType} Products
                    </h4>
                    
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : (
                        <Row>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Col key={product.id} md={4} className="mb-4">
                                        <div className="card h-100">
                                            <img 
                                                src={product.image} 
                                                className="card-img-top" 
                                                alt={product.name}
                                                style={{ height: "200px", objectFit: "contain" }}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">${product.price}</p>
                                                <button className="btn btn-primary">Add to Cart</button>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                !loading && <p>No products found in this category.</p>
                            )}
                        </Row>
                    )}
                </Container>
            )}

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
                    Categories
                </p>
                
                <button 
                    style={{
                        backgroundColor: "#28a745",
                        border: "2px solid #28a745",
                        padding: "10px 25px",
                        borderRadius: "4px",
                        position: "absolute",
                        left: "20px",
                        bottom: "20px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
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
                    Buy Now !
                </button>
            </Container>

            <Row className="justify-content-center bg-light mb-5 w-75 mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
                <div className="text-md-center mx-4 w-25 ">
                    <img src={c1} alt="user" style={{width:"60px",height:"auto" }}/>
                    <h4>Plus de 30000 clients satisfaits</h4>
                    <p>Un site de confiance avec des dizaines de milliers de colis livrés à son actif.</p>
                </div>
                <div className="text-md-center mx-4 w-25  ">
                    <img src={c2} alt="user" style={{width:"60px",height:"auto" }}/>
                    <h4>Plus de 12 ans d'expérience</h4>
                    <p>Une expertise acquise après une longue expérience dans la vente en ligne du matériel informatique.</p>
                </div>
                <div className="text-md-center mx-4 w-25 ">
                    <img src={c3} alt="user" style={{width:"60px",height:"auto" }}/>
                    <h4>Plus de 10000 références</h4>
                    <p>De nombreuses références listées pour répondre à tous les besoins et tous les budgets.</p>
                </div>
            </Row>
        </>
    );
}