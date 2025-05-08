import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Container, Form, Alert, Row, Col, Modal, Badge } from 'react-bootstrap';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        card_number: '',
        expiry_date: '',
        cvv: '',
        card_holder: ''
    });
    const [paymentError, setPaymentError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                // Fetch cart items
                const itemsResponse = await fetch(`${API_BASE_URL}/cart`, {
                    credentials: 'include'
                });
                
                if (!itemsResponse.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                
                const itemsData = await itemsResponse.json();
                setCartItems(itemsData.items || []);

                // Fetch cart count
                const countResponse = await fetch(`${API_BASE_URL}/cart/count`, {
                    credentials: 'include'
                });
                
                if (countResponse.ok) {
                    const countData = await countResponse.json();
                    setCartCount(countData.count);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/cart/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    item_id: itemId,
                    quantity: newQuantity
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            
            const updatedCart = await response.json();
            setCartItems(updatedCart.items);
            setCartCount(updatedCart.count || 0);
        } catch (err) {
            setError(err.message);
        }
    };

    const removeItem = async (itemId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ item_id: itemId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to remove item');
            }
            
            const updatedCart = await response.json();
            setCartItems(updatedCart.items);
            setCartCount(updatedCart.count || 0);
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentError(null);
        
        try {
            // Validate payment info
            if (!paymentInfo.card_number || !paymentInfo.expiry_date || !paymentInfo.cvv || !paymentInfo.card_holder) {
                throw new Error('All payment fields are required');
            }
            
            // Process payment
            const response = await fetch(`${API_BASE_URL}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    payment_info: paymentInfo,
                    items: cartItems
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment failed');
            }
            
            const result = await response.json();
            setSuccessMessage('Payment successful! Your order has been placed.');
            setCartItems([]);
            setCartCount(0);
            setShowPaymentModal(false);
            
            // Redirect to order confirmation after 3 seconds
            setTimeout(() => {
                navigate(`/order-confirmation/${result.order_id}`);
            }, 3000);
        } catch (err) {
            setPaymentError(err.message);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return <div className="text-center mt-4">Loading cart...</div>;
    }

    if (error) {
        return <Alert variant="danger" className="mt-4">{error}</Alert>;
    }

    if (cartItems.length === 0) {
        return (
            <Container className="mt-4">
                <Alert variant="info">Your cart is empty</Alert>
                <Button variant="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            
            <h2>Your Cart</h2>
            <p>Maximum 3 products allowed in cart</p>
            
            <Row>
                <Col md={8}>
                    {cartItems.map(item => (
                        <Card key={item.id} className="mb-3">
                            <Card.Body>
                                <Row>
                                    <Col md={3}>
                                        <img 
                                            src={item.image || '/default-product-image.jpg'} 
                                            alt={item.name}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            Price: {item.price} DH<br/>
                                            Type: {item.product_type}
                                        </Card.Text>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId={`quantity-${item.id}`}>
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                min="1" 
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                            />
                                        </Form.Group>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            className="mt-2"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
                
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <hr/>
                            {cartItems.map(item => (
                                <div key={item.id} className="mb-2">
                                    {item.name} x {item.quantity}: {item.price * item.quantity} DH
                                </div>
                            ))}
                            <hr/>
                            <div className="fw-bold">Total: {calculateTotal()} DH</div>
                            <hr/>
                            <Button 
                                variant="primary" 
                                onClick={() => setShowPaymentModal(true)}
                                disabled={cartItems.length === 0}
                            >
                                Commander
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Payment Modal */}
            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {paymentError && <Alert variant="danger">{paymentError}</Alert>}
                    <Form onSubmit={handlePaymentSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="1234 5678 9012 3456"
                                value={paymentInfo.card_number}
                                onChange={(e) => setPaymentInfo({...paymentInfo, card_number: e.target.value})}
                            />
                        </Form.Group>
                        
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="MM/YY"
                                        value={paymentInfo.expiry_date}
                                        onChange={(e) => setPaymentInfo({...paymentInfo, expiry_date: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="123"
                                        value={paymentInfo.cvv}
                                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Card Holder Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="John Doe"
                                value={paymentInfo.card_holder}
                                onChange={(e) => setPaymentInfo({...paymentInfo, card_holder: e.target.value})}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Submit Payment
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}