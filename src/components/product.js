import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data from API if not passed as prop
  useEffect(() => {
    if (!product) {
      const fetchProductData = async () => {
        try {
          // Replace with your actual API endpoint
          const response = await axios.get(`http://localhost:8000/api/products/${id}`);
          setProductData(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
          console.error("Error fetching product data:", err);
        }
      };

      fetchProductData();
    } else {
      setProductData(product);
      setLoading(false);
    }
  }, [product]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productData) return <div>No product data available</div>;

  const { id, name: title, price, image, rating = 4, reviews = 0, isNew = false } = productData;

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
        src={image || 'https://via.placeholder.com/200'} // Fallback image if none provided
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