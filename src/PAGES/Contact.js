import React, { useState } from 'react';
import { Breadcrumb, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '../CSS/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Form submitted successfully:', data);
        // Clear the form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setSubmissionStatus('success');
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <Container className="contact-page py-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Contact</Breadcrumb.Item>
      </Breadcrumb>

      {/* Submission Status Alerts */}
      {submissionStatus === 'success' && (
        <Alert variant="success" onClose={() => setSubmissionStatus(null)} dismissible>
          Thank you for your message! We will contact you soon.
        </Alert>
      )}
      {submissionStatus === 'error' && (
        <Alert variant="danger" onClose={() => setSubmissionStatus(null)} dismissible>
          There was an error submitting your form. Please try again.
        </Alert>
      )}

      <Row className="contact-container g-4">
        {/* Contact Information Column */}
        <Col lg={4} className="contact-info">
          <div className="contact-section mb-4 p-3 bg-light rounded">
            <h3 className="mb-3">Call To Us</h3>
            <p className="mb-1">We are available 24/7, 7 days a week.</p>
            <p className="mb-0">Phone: +00 00 00 00 00</p>
          </div>

          <div className="contact-section p-3 bg-light rounded">
            <h3 className="mb-3">Write To US</h3>
            <p className="mb-1">Fill out our form and we will contact you within 24 hours.</p>
            <p className="mb-1">Emails: customer@exclusive.com</p>
            <p className="mb-0">Emails: support@exclusive.com</p>
          </div>
        </Col>

        {/* Contact Form Column */}
        <Col lg={8}>
          <Form onSubmit={handleSubmit} className="contact-form p-4 bg-light rounded">
            <Row className="mb-3">
              <Col md={4} className="mb-3 mb-md-0">
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formPhone">
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4" controlId="formMessage">
              <Form.Control
                as="textarea"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="send-message-btn w-100">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;