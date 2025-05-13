import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/BrowseByCategory.css';

const BrowseByCategory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Convert string prices to numbers
        const processedData = data.map(product => ({
          ...product,
          price: Number(product.price),
          originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0
        }));
        setProducts(processedData);
        setFilteredProducts(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let result = [...products];

    // Apply name filter
    if (filters.name) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product =>
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply price range filter
    if (filters.minPrice) {
      result = result.filter(product =>
        Number(product.price) >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(product =>
        Number(product.price) <= parseFloat(filters.maxPrice)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - keep original order
        break;
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'featured'
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {'★'.repeat(fullStars)}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/Details/${productId}`);
  };

  // Get unique categories for the dropdown
  const categories = [...new Set(products.map(product => product.category))];

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="browse-container">
      {/* Filter Dropdown Button */}
      <div className="filter-toggle">
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters Dropdown */}
      {showFilters && (
        <div className="filters-dropdown">
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="name">Search:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Product name..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-inputs">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max"
                min="0"
              />
            </div>
          </div>

          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Main Content */}
      <main>
        <h1 className="section-title">Just For You</h1>
        
        <div className="products-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </div>
        
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  <img 
                    src={product.image || 'https://fakeimg.pl/400x400'} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://fakeimg.pl/400x400';
                    }}
                  />
                  {product.originalPrice && (
                    <span className="discount-badge">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-category">{product.category}</div>
                  <div className="product-price">
                    {product.originalPrice ? (
                      <>
                        <span className="original-price">${Number(product.originalPrice).toFixed(2)}</span>
                        <span className="current-price">${Number(product.price).toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="current-price">${Number(product.price).toFixed(2)}</span>
                    )}
                  </div>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                  <button 
                    className="add-to-cart"
                    onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking add to cart
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products match your filters.</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrowseByCategory;