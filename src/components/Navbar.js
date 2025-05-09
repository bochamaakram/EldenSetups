import logo from '../images/logo.jpg'
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CustomNavbar = () => {
    return (
    <Navbar expand="lg" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <Container fluid style={{ justifyContent: 'space-between' }}>
        
        <Nav className="me-auto" style={{ gap: '2rem' }}>
            <Nav.Link href="/" style={{ color: '#000' }}><img src={logo} alt='logo' style={{width:'50px'}} /></Nav.Link>
            <Nav.Link href="/" style={{ color: '#000' }}>Home</Nav.Link>
            <Nav.Link href="/contact" style={{ color: '#000' }}>Contact</Nav.Link>
            <Nav.Link href="/about" style={{ color: '#000' }}>About</Nav.Link>
            <Nav.Link href="/signup" style={{ color: '#000' }}>Sign Up</Nav.Link>
        </Nav>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem', color: '#1E3A8A' }}></i>
            <a href='/login'><i className="bi bi-person" style={{ fontSize: '1.5rem', color: '#000' }}></i></a>
        </div>

        </Container>
    </Navbar>
    );
};

export default CustomNavbar;
