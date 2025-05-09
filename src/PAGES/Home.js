import {Row,Col, Container } from 'react-bootstrap';
import c1 from "../images/utilisateur-actif (1).png"
import c2 from "../images/ecran.png"
import c3 from "../images/chariot (1).png"
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
import bgo from "../images/bgo.jpg"
import ProductCard from '../components/product';
import { BiFontFamily } from 'react-icons/bi';


export default function Home(){
    const [products, setProducts] = useState([]);

//api
        // useEffect(() => {
        //     if (selectedType) {
        //     axios.get(`http://localhost:8000/api/products/${selectedType}`)
        //         .then((response) => {
        //         setProducts(response.data);
        //         })
        //         .catch((error) => {
        //         console.error("Error fetching products:", error);
        //         });
        //     }
        // }, [selectedType]);

    //category
    const categories = [
        { img: or, name: "moniteur" },
        { img: c, name: "Web Cam" },
        { img: cm, name: "Pc Accessories" },
        { img: jeu, name: "Games" },
        { img: pro, name: "Processor" },
        { img: cg, name: "Graphics Card" }
      ];
      
      //the strip in the end 
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
    
    
    
    return( <>
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
            <div className="container py-4 mt-4">
                <div className="row g-4">
                  {[...Array(8)].map((_, index) => (
                    <div className="col-12 col-sm-6 col-md-3" key={index}>
                      <ProductCard />
                    </div>
                  ))}
                </div>
              </div>
            <div>
            </div>     
        </Row>
        </Container>
        

        <Container >
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
                backgroundColor: '#FFFFFF',':hover': {backgroundColor: '#1E3A8A', '& img, & p': {
                    filter: 'brightness(0) invert(1)'
                  }
                }
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


    <Container 
      style={{ height: "70vh",width: "80vw",position: 'relative',marginTop: "70px",backgroundImage: `url(${bgo})`,
        backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundPosition: "center",display: "flex",flexDirection: "column",
        justifyContent: "space-between",padding: "20px",borderRadius: "8px",boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
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
          backgroundColor: "#28a745",border: "2px solid #28a745",padding: "10px 25px",borderRadius: "4px",position: "absolute",left: "20px",bottom: "20px",
          fontSize: "1rem",fontWeight: "bold",cursor: "pointer",transition: "all 0.3s ease",':hover': {backgroundColor: "#28a745",color: "#fff"
          }
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

        <Container className='mt-5'>
            <Row>
            <h4 style={{
              borderLeft: '15px #1E3A8A solid',
              color: '#1E3A8A',
              borderRadius: "3px",
              paddingLeft: "10px",
              marginBottom: "0.5rem"
            }}>
              Our product
            </h4>
            <h2 style={{ marginBottom: "2rem", }}>Explore our products</h2>
            <div className="container py-4 mt-4">
                <div className="row g-4">
                  {[...Array(12)].map((_, index) => (
                    <div className="col-12 col-sm-6 col-md-3" key={index}>
                      <ProductCard />
                    </div>
                  ))}
                </div>
              </div>
            </Row>
        </Container>

    <Container style={{ marginTop: '50px',width:'65%',marginBottom:'50px'}}>
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



        

        <div>
    </div>
        
    </>
    );
}