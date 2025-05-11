import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import defaultImage from "../images/ordinateur-portable-hp-dragonfly-g4-96z84et.jpg";

const API_BASE_URL = 'http://localhost:8000/api';

const getImageUrl = (imagePath) => {
  if (!imagePath) return defaultImage;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`;
};

export default function ProductFull() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImg, setCurrentImg] = useState(defaultImage);
  const [productImages, setProductImages] = useState([]);

  const addToCart = async () => {
    try {
      // First check authentication
      const authCheck = await fetch(`${API_BASE_URL}/check-auth`, {
        credentials: 'include'
      });
      
      if (!authCheck.ok) {
        // Store intended URL before redirecting to login
        localStorage.setItem('intended_url', window.location.pathname);
        window.location.href = 'http://localhost:8000/login';
        return;
      }
  
      // If authenticated, add to cart
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: id,
          quantity: 1,
          price: product.price,
          name: product.name,
          image: productImages[0] || null
        })
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to cart');
      }
  
      const result = await response.json();
      if (result.success) {
        alert('Product added to cart successfully!');
        
        // Update cart counter in navbar if exists
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
          const currentCount = parseInt(cartCounter.textContent) || 0;
          cartCounter.textContent = currentCount + 1;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setProduct(result);
        
        // Process images
        const images = [];
        
        // Add main image if exists
        if (result.image) images.push(result.image);
        
        // Add gallery images if exists
        if (result.images && Array.isArray(result.images)) {
          images.push(...result.images);
        }
        
        setProductImages(images);
        
        if (images.length > 0) {
          setCurrentImg(getImageUrl(images[0]));
        } else {
          setCurrentImg(defaultImage);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleImageClick = (img) => {
    setCurrentImg(getImageUrl(img));
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error} - Redirecting to home page...
      </Alert>
    );
  }

  if (!product) {
    return (
      <Alert variant="warning" className="mt-4">
        Product not found
      </Alert>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <div className="d-flex flex-column align-items-center">
            <div className='mb-4'> 
              <img 
                src={currentImg} 
                alt={product.name}   
                style={{
                  maxWidth: '100%', 
                  height: '400px', 
                  objectFit: 'contain'
                }}
                className="img-fluid"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
            </div>
            
            {productImages.length > 1 && (
              <div className='d-flex flex-wrap gap-2 justify-content-center'>
                {productImages.map((img, index) => (
                  <img 
                    key={index}
                    src={getImageUrl(img)} 
                    alt={`Thumbnail ${index + 1}`} 
                    style={{
                      width: '80px', 
                      height: '80px',
                      cursor: 'pointer',
                      objectFit: 'cover',
                      border: currentImg === getImageUrl(img) ? '2px solid #0d6efd' : '1px solid #ddd'
                    }}  
                    onClick={() => handleImageClick(img)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Col>
        
        <Col md={6}>
          <div className="product-details">
            <h2 className="mb-3">{product.name}</h2>
            
            {product.description && (
              <div className="mb-4">
                <h5>Description</h5>
                <p className="text-muted">{product.description}</p>
              </div>
            )}
            
            <div className="mb-4">
              <h5>Price</h5>
              <p className="text-primary fs-3 fw-bold">
                {product.price} DH
              </p>
            </div>
            
            {product.catégorie && (
              <div className="mb-4">
                <h5>Catégorie</h5>
                <p>{product.catégorie}</p>
              </div>
            )}
            
            {product.subCatégorie && (
              <div className="mb-4">
                <h5>Sous-catégorie</h5>
                <p>{product.subCatégorie}</p>
              </div>
            )}
            
            {product.rating && (
              <div className="mb-4">
                <h5>Rating</h5>
                <p>{product.rating}</p>
              </div>
            )}
            
            <div className="mb-4">
              <h5>Availability</h5>
              <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            
            <Button 
              variant="primary" 
              size="lg"
              className="mt-3"
              disabled={!product.stock || product.stock <= 0}
              onClick={addToCart}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}