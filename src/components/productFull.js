import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
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
  const { currentUser, loading: authLoading } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImg, setCurrentImg] = useState(defaultImage);
  const [productImages, setProductImages] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product (status: ${response.status})`);
        }

        const productData = await response.json();
        const images = [];

        if (productData.image) images.push(productData.image);
        if (Array.isArray(productData.images)) images.push(...productData.images);

        setProduct(productData);
        setProductImages(images);
        setCurrentImg(images.length ? getImageUrl(images[0]) : defaultImage);

      } catch (err) {
        console.error('Product fetch error:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      setAddingToCart(true);

      if (!currentUser) {
        localStorage.setItem('intended_url', window.location.pathname);
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          product_id: id,
          quantity: 1,
          price: product.price,
          name: product.name,
          image: productImages[0] || defaultImage
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add item to cart');
      }

      alert('Product added to cart successfully!');
      await updateCartCounter();

    } catch (err) {
      console.error('Cart Error:', err);
      alert(err.message || 'An error occurred while adding to cart');
      if (err.message.includes('401')) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const updateCartCounter = async () => {
    try {
      if (!currentUser?.id) return;

      const response = await fetch(`${API_BASE_URL}/cart-items?user_id=${currentUser.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const cartItems = await response.json();
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
          cartCounter.textContent = cartItems.length || 0;
        }
      }
    } catch (error) {
      console.error('Failed to update cart counter:', error);
    }
  };

  const handleImageClick = (img) => {
    setCurrentImg(getImageUrl(img));
  };

  if (authLoading || loading) {
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
        {error}
        <div className="mt-3">
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
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
                    alt={`${product.name} thumbnail ${index + 1}`} 
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
                {product.price ? `${product.price.toLocaleString()} DH` : 'N/A'}
              </p>
            </div>

            {product.catégorie && (
              <div className="mb-4">
                <h5>Category</h5>
                <p>{product.catégorie}</p>
              </div>
            )}

            {product.subCatégorie && (
              <div className="mb-4">
                <h5>Subcategory</h5>
                <p>{product.subCatégorie}</p>
              </div>
            )}

            {product.rating && (
              <div className="mb-4">
                <h5>Rating</h5>
                <p>{product.rating}/5</p>
              </div>
            )}

            <div className="mb-4">
              <h5>Availability</h5>
              <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            <Button 
              variant="primary" 
              size="lg"
              className="mt-3"
              disabled={product.stock <= 0 || addingToCart || !currentUser}
              onClick={addToCart}
            >
              {addingToCart ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {' Adding...'}
                </>
              ) : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
