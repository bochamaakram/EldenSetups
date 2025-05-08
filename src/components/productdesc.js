import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import im1 from '../images/pc/1.jpg'
import im2 from '../images/pc/2.jpg'
import im3 from '../images/pc/3.jpg'
import im4 from '../images/pc/4.jpg'
import im5 from '../images/pc/5.jpg'

export default function ProductPage() {

    const [currentImg, setCurrentImg]=useState(im1)

    const handleClick=(img)=>{
        setCurrentImg(img)
    }

    const product = {
        name: "Gaming Laptop",
        price: "$1200",
        description: "High-performance gaming laptop with 16GB RAM, 1TB SSD, and RTX 3060 graphics.",
        };
  return (
    <Container fluid className="m-4 w-100">
      <Row>
        <Col className='w-50'>
            <div className=" bg-body  d-flex flex-column justify-content-center">
                <div className='d-flex justify-content-center'> 
                    <img src={currentImg} alt={product.name}   style={{width:'350px',height:'auto'}}/>
                </div>
                <div className='d-flex  justify-content-center gap-5'>
                    <img src={im1} alt={product.name} style={{width:'80px',height:'auto'}}  onClick={() => handleClick(im1)}/>
                    <img src={im2} alt={product.name}  style={{width:'80px',height:'auto'}} onClick={() => handleClick(im2)}/>
                    <img src={im3} alt={product.name}  style={{width:'80px',height:'auto'}} onClick={() => handleClick(im3)}/>
                    <img src={im4} alt={product.name}  style={{width:'80px',height:'auto'}} onClick={() => handleClick(im4)}/>
                    <img src={im5} alt={product.name}  style={{width:'80px',height:'auto'}} onClick={() => handleClick(im5)}/>
                </div>
            </div>
        </Col>
        <Col className='w-50'>
        <div >
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
        </Col>
      </Row>
    </Container>
  );
}
