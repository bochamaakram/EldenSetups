import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '3rem 1rem' }}>
      <Container>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col md={3}>
            <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Account</h5>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2rem' }}>
            <a href='/profil' style={{color:'white'}}><li>My Account</li></a>
            <a href='/login' style={{color:'white'}}><li>Login / Register</li></a>
            <a href=' ' style={{color:'white'}}><li>Cart</li></a>
            <a href=' ' style={{color:'white'}}><li>Shop</li></a>
            </ul>
          </Col>

          <Col md={3}>
            <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Support</h5>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2rem' }}>
              <a href=' ' style={{color:'white'}}><li>Live chat</li></a>
              <a href=' ' style={{color:'white'}}><li>Contact</li></a>
            </ul>
          </Col>

          <Col md={3} style={{ display: 'flex', alignItems: 'start', gap: '1.5rem', fontSize: '1.4rem' }}>
          <a href=' ' style={{color:'white'}}><i className="bi bi-facebook"></i></a>
          <a href=' ' style={{color:'white'}}><i className="bi bi-twitter"></i></a>
          <a href=' ' style={{color:'white'}}><i className="bi bi-instagram"></i></a>
          <a href=' ' style={{color:'white'}}><i className="bi bi-linkedin"></i></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
