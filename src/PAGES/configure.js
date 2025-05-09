import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const components = [
  "processeur",
  "Mother board",
  "graphique card",
  "power supply",
  "cooling",
  "storage",
  "ram",
  "case"
];

const Accessor = () => {
  return (
    
    <div className="container py-4" >
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item active style={{color:'black'}}>Configer</Breadcrumb.Item>
    </Breadcrumb>

      <div className="d-flex flex-column gap-3">
        {components.map((item, idx) => (
          <div key={idx} className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center" style={{ backgroundColor: '#d3d3d3' }}>
              <h5 className="mb-0 text-capitalize">{item}</h5>
              <Link
                to={`/add?type=${encodeURIComponent(item)}`}
                className="btn text-white"
                style={{ backgroundColor: '#1E3A8A' }}
              >
                <i className="bi bi-plus-circle me-2"></i> Add
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessor;
