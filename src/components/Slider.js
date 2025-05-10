import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faMicrochip, 
  faGamepad, 
  faPalette, 
  faChevronLeft, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      bgImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Premium PCs & Components",
      subtitle: "Experience unparalleled performance with our custom-built gaming PCs",
      btnText: "Shop Now",
      icon: faArrowRight
    },
    {
      bgImage: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Cutting-Edge Performance",
      subtitle: "Powered by the latest hardware technology for maximum FPS",
      btnText: "Explore Components",
      icon: faMicrochip
    },
    {
      bgImage: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Ultimate Gaming Experience",
      subtitle: "Designed by gamers for the most demanding players",
      btnText: "View Gaming PCs",
      icon: faGamepad
    },
    {
      bgImage: "https://img.freepik.com/free-photo/electronic-sports-league-background-3d-illustration_1419-2790.jpg?uid=R138548460&ga=GA1.1.84858734.1741686198&semt=ais_hybrid&w=740",
      title: "Custom RGB Lighting",
      subtitle: "Personalize your setup with stunning lighting effects",
      btnText: "Customize Now",
      icon: faPalette
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Inline styles
  const styles = {
    heroSection: {
      position: 'relative',
      width: '100%',
      height: '90vh',
      overflow: 'hidden'
    },
    heroSlideshow: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    slide: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: 'opacity 1s ease-in-out'
    },
    activeSlide: {
      opacity: 1
    },
    slideBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      height: '100%',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center'
    },
    heroContent: {
      maxWidth: '600px',
      color: 'white',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)'
    },
    heroTitle: {
      fontSize: '3rem',
      marginBottom: '1rem',
      
      textAlign: 'left',
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      textAlign: 'left',
    },
    heroBtn: {
      display: 'flex',
      alignItems: 'center',
        justifyContent: 'start',
      padding: '12px 24px',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s'
    },
    heroBtnHover: {
      backgroundColor: '#0052a3'
    },
    slideshowControls: {
      position: 'absolute',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      zIndex: 10
    },
    navButton: {
      background: 'rgba(255, 255, 255, 0.3)',
      border: 'none',
      color: 'white',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s'
    },
    navButtonHover: {
      background: 'rgba(255, 255, 255, 0.5)'
    },
    slideDots: {
      display: 'flex',
      gap: '10px'
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.5)',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 0.3s'
    },
    activeDot: {
      background: 'white'
    }
  };

  return (
    <section style={styles.heroSection}>
      <div style={styles.heroSlideshow}>
        {slides.map((slide, index) => (
          <div 
            key={index}
            style={{
              ...styles.slide,
              ...(index === currentSlide ? styles.activeSlide : {})
            }}
          >
            <div 
              style={{
                ...styles.slideBg,
                backgroundImage: `url(${slide.bgImage})`
              }}
            />
            <div style={styles.container}>
              <div style={styles.heroContent}>
                <h1 style={styles.heroTitle}>{slide.title}</h1>
                <p style={styles.heroSubtitle}>{slide.subtitle}</p>
                <a 
                  href="#featured-products" 
                  style={styles.heroBtn}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.heroBtnHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.heroBtn.backgroundColor}
                >
                  <span style={{ marginRight: '10px' }}>{slide.btnText}</span>
                  <FontAwesomeIcon icon={slide.icon} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.slideshowControls}>
        <button 
          style={styles.navButton}
          onClick={prevSlide}
          onMouseEnter={(e) => e.currentTarget.style.background = styles.navButtonHover.background}
          onMouseLeave={(e) => e.currentTarget.style.background = styles.navButton.background}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div style={styles.slideDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentSlide ? styles.activeDot : {})
              }}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button 
          style={styles.navButton}
          onClick={nextSlide}
          onMouseEnter={(e) => e.currentTarget.style.background = styles.navButtonHover.background}
          onMouseLeave={(e) => e.currentTarget.style.background = styles.navButton.background}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
};

export default Slider;