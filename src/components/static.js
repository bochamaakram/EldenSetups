import React from 'react';

export default function Statistics() {
  const stats = [
    { title: 'Orders', value: 120, bgColor: '#007bff' },
    { title: 'Users', value: 75, bgColor: '#28a745' },
    { title: 'Revenue(MAD)', value: '8,500', bgColor: '#ffc107' },
  ];

  const circleStyle = {
    color: '#000',
    borderRadius: '50%',
    width: '180px',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '5px solid',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: '2rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    flexDirection: 'column',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    padding: '10px',
  };

  const titleStyle = {
    fontSize: '1rem',
    marginTop: '0.5rem',
    fontWeight: '600',
    color: '#555',
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
        Company Statistics
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              ...circleStyle,
              borderColor: stat.bgColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div>{stat.value}</div>
            <div style={titleStyle}>{stat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
