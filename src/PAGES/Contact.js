import React, { useState } from 'react';
import '../CSS/ContactPage.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';




const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
      // Show success message to user
      alert('Thank you for your message! We will contact you soon.');
    } else {
      throw new Error(data.message || 'Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error submitting your form. Please try again.');
  }
};

  return (
    <div className="contact-page">

      <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      
      <Breadcrumb.Item active>Contact</Breadcrumb.Item>
    </Breadcrumb>
  

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-section">
            <h3>Call To Us</h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +00 00 00 00 00</p>
          </div>

          <div className="contact-section">
            <h3>Write To US</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Massage"
              value={formData.message}
              onChange={handleChange}
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="send-message-btn">
            Send Massage
          </button>
        </form>
      </div>

    </div>
  );
};

export default ContactPage;