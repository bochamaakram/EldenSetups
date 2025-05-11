import logo from '../images/logo.jpg';
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CustomNavbar = () => {
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee' }} collapseOnSelect>
            <Container fluid>
                {/* Brand/logo - always visible */}
                <Navbar.Brand href="/" style={{ marginRight: '2rem' }}>
                    <img src={logo} alt='logo' style={{ width: '50px' }} />
                </Navbar.Brand>
                
                {/* Hamburger button for mobile */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                {/* Collapsible content */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Left-aligned nav items */}
                    <Nav className="me-auto" style={{ gap: '1rem' }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>
                    
                    {/* Right-aligned icons - will stack below nav items on mobile */}
                    <Nav style={{ gap: '1.5rem', padding: '1rem 0' }}>
                        <Nav.Link href="/Cart">
                            <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem', color: '#1E3A8A' }}></i>
                        </Nav.Link>
                        <Nav.Link href="/profil">
                            <i className="bi bi-person" style={{ fontSize: '1.5rem', color: '#000' }}></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;