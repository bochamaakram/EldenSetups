import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import image1 from '../images/ordinateur-portable-hp-dragonfly-g4-96z84et.jpg';

const ProductCard = ({ id = 1 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const image = image1;
  const title = 'Gaming Laptop';
  const price = 1299.99;
  const rating = 4;
  const reviews = 87;
  const isNew = true;

  return (
    <Card
      className="shadow-sm border-0 position-relative"
      style={{ width: '18rem', cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && (
        <div className="position-absolute top-0 start-0 m-2">
          <Badge bg="danger">SOLD</Badge>
        </div>
      )}

      <Link
        to={`/Details/${id}`}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 10,
          backgroundColor: '#F5F7F8',
          borderRadius: '50%',
          padding: '6px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          color: 'black',
        }}
      >
        <i className="bi bi-eye-fill fs-5"></i>
      </Link>

      <Card.Img
        variant="top"
        src={image}
        style={{
          backgroundColor: '#F5F7F8',
          height: '200px',
          objectFit: 'contain',
        }}
      />

      <Card.Body>
        <Card.Title className="mb-2">{title}</Card.Title>
        <h5 className="text-primary">${price}</h5>

        <div className="d-flex align-items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className={`bi ${index < rating ? 'bi-star-fill' : 'bi-star'} text-warning me-1`}
            />
          ))}
          <small className="text-muted ms-1">({reviews})</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

