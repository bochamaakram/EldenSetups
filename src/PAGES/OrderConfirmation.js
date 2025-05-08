import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function OrderConfirmation() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchOrder();
    }, [orderId]);
    
    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
                <p>Loading order details...</p>
            </Container>
        );
    }
    
    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }
    
    return (
        <Container className="mt-4">
            <Card>
                <Card.Header as="h3">Order Confirmation</Card.Header>
                <Card.Body>
                    <Card.Title>Thank you for your order!</Card.Title>
                    <Card.Text>
                        Your order #{order.id} has been placed successfully.
                    </Card.Text>
                    
                    <div className="mt-4">
                        <h5>Order Summary</h5>
                        <hr/>
                        {order.items.map(item => (
                            <div key={item.id} className="mb-2">
                                {item.name} x {item.quantity}: {item.price * item.quantity} DH
                            </div>
                        ))}
                        <hr/>
                        <div className="fw-bold">Total: {order.total_amount} DH</div>
                    </div>
                    
                    <div className="mt-4">
                        <p>We've sent a confirmation email to your registered email address.</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}