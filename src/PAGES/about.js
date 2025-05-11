import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import shop from "../images/icons/magasin.png";
import dollar from "../images/icons/symbole-du-dollar.png";
import dollars from "../images/icons/sac-dargent (1).png";
import gift from "../images/icons/boite-cadeau.png";
import shopp from "../images/SHOP3.webp";

export default function Aboutt() {
    return (
        <div className="about-page bg-white">
            {/* Breadcrumb Navigation */}
            <div className="py-3">
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>About</Breadcrumb.Item>
                    </Breadcrumb>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="my-5">
                {/* Hero Section */}
                <Row className="align-items-center my-5">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <img
                            src={shopp}
                            alt="Electronic Shop"
                            className="img-fluid rounded-3 shadow-lg w-100"
                            style={{
                                maxHeight: '600px',
                                objectFit: 'cover',
                            }}
                        />
                    </Col>
                    <Col lg={6}>
                        <h1 className="display-4 fw-bold mb-4">
                            Our Story
                        </h1>
                        <p className="fs-5 lh-lg text-muted">
                            Welcome to Elden Setup, your trusted destination for high-quality computer components.<br />
                            Whether you're building a custom PC, upgrading your system, or searching for the latest tech, 
                            we offer a wide range of products to meet your needs. <br />
                            Our mission is to provide top-notch hardware at competitive prices while ensuring excellent customer service.<br />
                            With a passion for technology, we strive to help enthusiasts, gamers, and professionals find the perfect components for their setups. <br />
                            Join us on our journey to power innovation and performance!
                        </p>
                    </Col>
                </Row>

                {/* Stats Section */}
                <Row className="my-5 justify-content-center">
                    <Col xs={12} className="mb-4">
                        <h2 className="text-center fw-bold">Our Achievements</h2>
                    </Col>
                    
                    <Col xs={6} md={3} className="mb-4">
                        <div className="stats-card h-100 p-3 text-center">
                            <div className="icon-container mb-3">
                                <img src={shop} alt="shop" className="img-fluid" />
                            </div>
                            <h3 className="fw-bold">500</h3>
                            <p className="m-0">Sellers active our site</p>
                        </div>
                    </Col>

                    <Col xs={6} md={3} className="mb-4">
                        <div className="stats-card h-100 p-3 text-center">
                            <div className="icon-container mb-3">
                                <img src={dollar} alt="dollar" className="img-fluid" />
                            </div>
                            <h3 className="fw-bold">1000+</h3>
                            <p className="m-0">Monthly Product Sale</p>
                        </div>
                    </Col>

                    <Col xs={6} md={3} className="mb-4">
                        <div className="stats-card h-100 p-3 text-center">
                            <div className="icon-container mb-3">
                                <img src={gift} alt="gift" className="img-fluid" />
                            </div>
                            <h3 className="fw-bold">2000+</h3>
                            <p className="m-0">Customer active in our site</p>
                        </div>
                    </Col>

                    <Col xs={6} md={3} className="mb-4">
                        <div className="stats-card h-100 p-3 text-center">
                            <div className="icon-container mb-3">
                                <img src={dollars} alt="dollars" className="img-fluid" />
                            </div>
                            <h3 className="fw-bold">30K+</h3>
                            <p className="m-0">Annual gross sale in our site</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* CSS Styles */}
            <style jsx>{`
                .about-page {
                    min-height: 100vh;
                }
                
                .stats-card {
                    border: 1px solid #dee2e6;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    background-color: #f8f9fa;
                }
                
                .stats-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                
                .icon-container {
                    background-color: #000;
                    border: 5px solid #6c757d;
                    border-radius: 50%;
                    width: 70px;
                    height: 70px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                }
                
                .icon-container img {
                    max-width: 60%;
                    max-height: 60%;
                    filter: brightness(0) invert(1);
                }
                
                @media (max-width: 768px) {
                    .display-4 {
                        font-size: 2.5rem;
                    }
                    
                    .stats-card {
                        padding: 1.5rem 0.5rem;
                    }
                    
                    .icon-container {
                        width: 50px;
                        height: 50px;
                    }
                }
            `}</style>
        </div>
    )
}