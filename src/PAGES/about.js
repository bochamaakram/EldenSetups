import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import shop from "../images/icons/magasin.png";
import dollar from "../images/icons/symbole-du-dollar.png";
import dollars from "../images/icons/sac-dargent (1).png";
import gift from "../images/icons/boite-cadeau.png";



export default function Aboutt(){
    return(
        <>
        <div className="bg-white">
            <Breadcrumb className="ps-5">
            <Breadcrumb.Item  href="/" >Home</Breadcrumb.Item>
            <Breadcrumb.Item active>About</Breadcrumb.Item>
            </Breadcrumb>
        </div>

            <Container className="w-100 mt-5 ">
                <Row >
                    <Col className="text-start"  >
                        <h1 className="ps-5">Our story</h1>
                                        <p className="fs-5 fw-bold lh-lg ps-3">
                                            &nbsp;&nbsp;Welcome to elden setup, your trusted destination for high-quality computer components.<br/>
                                            &nbsp;&nbsp;Whether you're building a custom PC, upgrading your system, or searching for the latest tech, 
                                            we offer a wide range of products to meet your needs. <br/>
                                            &nbsp;&nbsp;Our mission is to provide top-notch hardware at competitive prices while ensuring excellent customer service.<br/>
                                            &nbsp;&nbsp;With a passion for technology, 
                                            we strive to help enthusiasts, gamers, and professionals find the perfect components for their setups. <br/>
                                            Join us on our journey to power innovation and performance!
                                        </p>
                    </Col>
                </Row>

                <Row >
                    <div className="d-flex justify-content-center align-items-center  mt-5">
                        <div className="w-25 d-flex align-items-center flex-column border border-2 p-4 mx-4">
                            <div className="border border-5 border-secondary bg-black rounded-5 d-flex justify-content-center align-items-center" style={{height:"60px" ,width:"60px"}}>
                                <img src={shop} alt="shop"  />
                            </div>
                            <h3 className="fw-bold">500</h3>
                            <p className="m-0">Sallers active our site</p>
                        </div>

                        <div className="w-25  d-flex align-items-center flex-column border border-2 p-4 mx-4" >
                            <div  className="border border-5 border-secondary bg-black rounded-5 d-flex justify-content-center align-items-center" style={{height:"60px" ,width:"60px"}}>
                                <img src={dollar} alt="shop"  />
                            </div>
                            <h3 className="fw-bold">1000 </h3>
                            <p className="m-0">Monthly Produduct Sal</p>
                        </div>

                        <div className="w-25 d-flex align-items-center flex-column border border-2 p-4 mx-4">
                            <div  className="border border-5 border-secondary bg-black rounded-5 d-flex justify-content-center align-items-center" style={{height:"60px" ,width:"60px"}}>
                                <img src={gift} alt="shop"  />
                            </div>
                            <h3  className="fw-bold">2000</h3>
                            <p className="m-0">Customer active in our site</p>
                        </div>

                        <div className="w-25 d-flex align-items-center flex-column border border-2 p-4 mx-4">
                            <div  className="border border-5 border-secondary bg-black rounded-5 d-flex justify-content-center align-items-center" style={{height:"60px" ,width:"60px"}}>
                                <img src={dollars} alt="shop"  />
                            </div>
                            <h3 className="fw-bold">30 K</h3>
                            <p className="m-0">Anual gross sale in our site</p>
                        </div>
                    </div>

                </Row>

            </Container>
        </>
    )
}