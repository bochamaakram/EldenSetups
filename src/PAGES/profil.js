import React, { useState } from 'react';
import { Tab, Row, Col, Nav, Form, Button } from 'react-bootstrap';
import AddProduct from '../components/FormProduct'; // ✅ Make sure this path is correct
import Statistics from '../components/static';

export default function Profil() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Tab.Container defaultActiveKey="profile">
      <Row style={{ padding: '2rem' }}>
        {/* Sidebar */}
        <Col sm={3}>
          <h6 style={{ fontWeight: 'bold', color: '#000' }}>Manage My Account</h6>
          <Nav className="flex-column" style={{ marginBottom: '1.5rem' }}>
            <Nav.Link eventKey="profile" style={{ color: '#000' }}>My Profile</Nav.Link>
            <Nav.Link style={{ color: '#777' }}>Address Book</Nav.Link>
            <Nav.Link style={{ color: '#777' }}>My Payment Options</Nav.Link>
          </Nav>

          <h6 style={{ fontWeight: 'bold', color: '#000' }}>My Orders</h6>
          <Nav className="flex-column" style={{ marginBottom: '1.5rem' }}>
            <Nav.Link style={{ color: '#777' }}>My Returns</Nav.Link>
            <Nav.Link style={{ color: '#777' }}>My Cancellations</Nav.Link>
          </Nav>


          <h6 style={{ fontWeight: 'bold', color: '#000', marginTop: '2rem' }}>Admin Tools</h6>
          <Nav className="flex-column">
            <Nav.Link eventKey="addProduct" style={{ color: '#0d6efd' }}>
              Add Product
            </Nav.Link>
            <Nav.Link eventKey="statistics">
              Statistics
            </Nav.Link>
          </Nav>
        </Col>

        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="profile">
              <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '6px',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)',
              }}>
                <h5 style={{ color: '#0d6efd', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                  Edit Your Profile
                </h5>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Control type="text" placeholder="First Name" defaultValue="Md"
                          style={{ height: '45px', borderRadius: '4px' }} readOnly />
                      </Form.Group>
                    </Col>                    
                    <Col>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Control type="email" placeholder="Email" defaultValue="rimel1111@gmail.com"
                          style={{ height: '45px', borderRadius: '4px' }} readOnly />
                      </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                  </Row>

                  <h6 style={{ margin: '1.5rem 0 1rem', fontWeight: 'bold' }}>Password Changes</h6>

                  <Form.Group controlId="newPass" className="mb-3">
                    <Form.Control type="password" placeholder="New Password"
                      style={{ height: '45px', borderRadius: '4px' }} />
                  </Form.Group>
                  <Form.Group controlId="confirmPass" className="mb-4">
                    <Form.Control type="password" placeholder="Confirm New Password"
                      style={{ height: '45px', borderRadius: '4px' }} />
                  </Form.Group>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="light" style={{ border: 'none' }}>Cancel</Button>
                    <Button type="submit" style={{
                      backgroundColor: '#0d6efd',
                      borderColor: '#0d6efd',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '4px'
                    }}>
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="addProduct">
              <AddProduct />
            </Tab.Pane>

            <Tab.Pane eventKey="statistics">
              <Statistics />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
