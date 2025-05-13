import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Alert, Row, Col, Modal } from 'react-bootstrap';

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
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/cart-items`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const data = await response.json();
                setCartItems(data);
                setCartCount(data.length || 0);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentError(null);

        try {
            if (!paymentInfo.card_number || !paymentInfo.expiry_date || !paymentInfo.cvv || !paymentInfo.card_holder) {
                throw new Error('All payment fields are required');
            }

            const response = await fetch(`${API_BASE_URL}/checkout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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

            setTimeout(() => {
                navigate(`/order-confirmation/${result.order_id}`);
            }, 3000);
        } catch (err) {
            setPaymentError(err.message);
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Loading cart...</div>;
    }

    if (error) {
        return <Alert variant="danger" className="mt-4">{error}</Alert>;
    }

    if (cartItems.length === 0) {
        return (
            <Container className="mt-4" style={{ minHeight: '90vh' }}>
                <Alert variant="info">Your cart is empty</Alert>
                <Button variant="primary" onClick={() => navigate('/')}>Continue Shopping</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4" style={{ minHeight: '90vh' }}>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <h2>Your Cart</h2>

            <Row>
                <Col md={8}>
                    {cartItems.map(item => (
                        <Card key={item.id} className="mb-3">
                            <Card.Body>
                                <Row>
                                    <Col md={3}>
                                        <img 
                                            src={`http://localhost:8000/${item.image}`} 
                                            alt={item.name}
                                            style={{ width: '100%', height: 'auto' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/default-product-image.jpg';
                                            }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            Price: {item.price} DH<br/>
                                            Quantity: {item.quantity}
                                        </Card.Text>
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
                                Proceed to Payment
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
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, card_number: e.target.value })}
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
                                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry_date: e.target.value })}
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
                                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
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
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, card_holder: e.target.value })}
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