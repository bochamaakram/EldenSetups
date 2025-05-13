import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Statistics = () => {
  const { currentUser, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    contacts: true,
    products: true,
    users: true
  });
  const [error, setError] = useState({
    contacts: null,
    products: null,
    users: null
  });

  useEffect(() => {
    if (!currentUser) return;

    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      return;
    }

    // Configure axios instance with auth token
    const api = axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    // Fetch contacts data - changed to /contact endpoint
    api.get('/contact')
      .then(response => {
        let contactsData = [];
        // Handle different response formats
        if (Array.isArray(response.data)) {
          contactsData = response.data;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          contactsData = response.data.data;
        }
        setContacts(contactsData);
        setLoading(prev => ({ ...prev, contacts: false }));
      })
      .catch(err => {
        if (err.response?.status === 401) {
          logout();
        }
        setError(prev => ({ ...prev, contacts: err.message }));
        setLoading(prev => ({ ...prev, contacts: false }));
      });

    // Fetch products data (unchanged)
    api.get('/products')
      .then(response => {
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
        setLoading(prev => ({ ...prev, products: false }));
      })
      .catch(err => {
        if (err.response?.status === 401) {
          logout();
        }
        setError(prev => ({ ...prev, products: err.message }));
        setLoading(prev => ({ ...prev, products: false }));
      });

    // Fetch users data (unchanged)
    api.get('/users')
      .then(response => {
        const usersData = Array.isArray(response.data) ? response.data : [];
        setUsers(usersData);
        setLoading(prev => ({ ...prev, users: false }));
      })
      .catch(err => {
        if (err.response?.status === 401) {
          logout();
        }
        setError(prev => ({ ...prev, users: err.message }));
        setLoading(prev => ({ ...prev, users: false }));
      });
  }, [currentUser, logout]);

  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const totalUsers = users.length;
  const totalContacts = contacts.length;
  const recentContacts = Array.isArray(contacts) ? contacts.slice(0, 5) : [];

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">General Statistics Dashboard</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        {/* Products Card (unchanged) */}
        <div className="col-md-4 mb-4">
          <div className="card border-start border-primary border-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-muted mb-2">Products</h5>
                  {loading.products ? (
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : error.products ? (
                    <p className="text-danger small mb-0">Error: {error.products}</p>
                  ) : (
                    <>
                      <h2 className="mb-1">{totalProducts}</h2>
                      <p className="text-muted mb-3">Total Products</p>
                      <h2 className="mb-1">{totalStock}</h2>
                      <p className="text-muted mb-0">Total Stock</p>
                    </>
                  )}
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="bi bi-box-seam text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Card (unchanged) */}
        <div className="col-md-4 mb-4">
          <div className="card border-start border-success border-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-muted mb-2">Users</h5>
                  {loading.users ? (
                    <div className="spinner-border spinner-border-sm text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : error.users ? (
                    <p className="text-danger small mb-0">Error: {error.users}</p>
                  ) : (
                    <>
                      <h2 className="mb-1">{totalUsers}</h2>
                      <p className="text-muted mb-0">Total Users</p>
                    </>
                  )}
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="bi bi-people text-success" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Card - updated error display */}
        <div className="col-md-4 mb-4">
          <div className="card border-start border-info border-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-muted mb-2">Contacts</h5>
                  {loading.contacts ? (
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : error.contacts ? (
                    <>
                      <p className="text-danger mb-1">Error:</p>
                      <p className="text-danger small mb-0">Request failed with status code 404</p>
                    </>
                  ) : (
                    <>
                      <h2 className="mb-1">{totalContacts}</h2>
                      <p className="text-muted mb-0">Total Messages</p>
                    </>
                  )}
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <i className="bi bi-envelope text-info" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Contact Messages - updated error display */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Contact Messages</h5>
        </div>
        <div className="card-body">
          {loading.contacts ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error.contacts ? (
            <div className="alert alert-danger mb-0">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Error loading contacts: Request failed with status code 404
            </div>
          ) : recentContacts.length === 0 ? (
            <div className="alert alert-info mb-0">
              <i className="bi bi-info-circle-fill me-2"></i>
              No contact messages available
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Message</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContacts.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.name || <span className="text-muted">-</span>}</td>
                      <td>
                        {contact.email ? (
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>{contact.phone || <span className="text-muted">-</span>}</td>
                      <td>
                        {contact.message 
                          ? (contact.message.length > 50 
                            ? `${contact.message.substring(0, 50)}...` 
                            : contact.message)
                          : <span className="text-muted">-</span>}
                      </td>
                      <td className="text-end">
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Products Summary (unchanged) */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Products Summary</h5>
        </div>
        <div className="card-body">
          {loading.products ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error.products ? (
            <div className="alert alert-danger mb-0">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Error loading products: {error.products}
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Products
                    <span className="badge bg-primary rounded-pill">{totalProducts}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total Stock
                    <span className="badge bg-success rounded-pill">{totalStock}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Average Stock per Product
                    <span className="badge bg-info rounded-pill">
                      {totalProducts > 0 ? (totalStock / totalProducts).toFixed(2) : 0}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title text-center mb-3">Stock Distribution</h6>
                    <div className="progress mb-3" style={{ height: '20px' }}>
                      <div 
                        className="progress-bar progress-bar-striped progress-bar-animated" 
                        role="progressbar" 
                        style={{ 
                          width: `${totalProducts > 0 ? (totalStock / (totalStock + totalProducts)) * 100 : 0}%` 
                        }}
                        aria-valuenow={totalProducts > 0 ? (totalStock / (totalStock + totalProducts)) * 100 : 0}
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {totalProducts > 0 ? Math.round((totalStock / (totalStock + totalProducts)) * 100) : 0}%
                      </div>
                    </div>
                    <div className="d-flex justify-content-between small text-muted">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;