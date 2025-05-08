import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Badge, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import defaultImage from "../images/ordinateur-portable-hp-dragonfly-g4-96z84et.jpg";

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getImageUrl = (imagePath) => {
  if (!imagePath) return defaultImage;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`;
};

export default function Productfull() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImg, setCurrentImg] = useState(defaultImage);
  const [productImages, setProductImages] = useState([]);

  const addToCart = async () => {
    try {
        // First check authentication
        const authCheck = await fetch('http://127.0.0.1:8000/api/check-auth', {
            credentials: 'include'
        });
        
        if (!authCheck.ok) {
            // Store intended URL before redirecting to login
            localStorage.setItem('intended_url', window.location.pathname);
            window.location.href = 'http://127.0.0.1:8000/login';
            return;
        }
    
        // If authenticated, add to cart
        const response = await fetch('http://127.0.0.1:8000/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: id,
                product_type: type,
                quantity: 1,
                price: product.Prix,
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
            // Show success message
            alert('Product added to cart successfully!');
            
            // You can also update a cart counter in your navbar if you have one
            const cartCounter = document.getElementById('cart-counter');
            if (cartCounter) {
                const currentCount = parseInt(cartCounter.textContent) || 0;
                cartCounter.textContent = currentCount + 1;
            }
            
            // Optionally navigate to cart
            // navigate('/cart');
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
        
        const endpoint = `${API_BASE_URL}/Details/${type}/${id}`;
        console.log('Fetching from:', endpoint);

        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setProduct(result.data);
        
        const images = [];
        
        if (result.data.Image) images.push(result.data.Image);
        if (result.data.image) images.push(result.data.image);
        if (result.data.images?.main) images.push(result.data.images.main);
        
        if (result.data.images?.gallery && Array.isArray(result.data.images.gallery)) {
          images.push(...result.data.images.gallery);
        }
        
        const validImages = images.filter(img => img);
        
        setProductImages(validImages);
        
        if (validImages.length > 0) {
          setCurrentImg(getImageUrl(validImages[0]));
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
  }, [type, id, navigate]);

  const handleClick = (img) => {
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
        {error} - Redirecting to products page...
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
    <Container fluid className="m-4 w-100">
      <Row>
        <Col md={6}>
          <div className="bg-body d-flex flex-column justify-content-center">
            <div className='d-flex justify-content-center'> 
              <img 
                src={currentImg} 
                alt={product.name }   
                style={{width: '350px', height: 'auto', objectFit: 'contain'}}
                className="img-fluid mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
            </div>
            
            {productImages.length > 1 && (
              <div className='d-flex justify-content-center gap-3 flex-wrap'>
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
                    onClick={() => handleClick(img)}
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
          <div>
            <h2>{product.name}</h2>
            <hr/>
            {product.Description && (
              <div className="mb-4">
                <p>{product.Description}</p>
              </div>
            )}
            <hr/>
            <h5 className='text-primary'><span style={{color:"black"}}>Marque : </span><h6 style={{display:"inline"}}>{product.Marque}</h6> </h5>
            { product.type === "Stockage" &&(
            <h5>catégorie : <h6 style={{display:"inline"}}>{product?.['Sous-catégories'].replace(/_/g, ' ')}</h6></h5>
              )}

            
            <hr/>
            
            <span className="current-price fw-bold fs-2">
              {product.Prix} DH
            </span>
            <br/>

            <hr/>

            <div className="d-flex gap-3">
              <Button 
                variant="warning" 
                className="add-to-cart-btn"
                disabled={!product.Quantité_en_stock || product.Quantité_en_stock <= 0}
                onClick={addToCart}
              >
                {product.Quantité_en_stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}