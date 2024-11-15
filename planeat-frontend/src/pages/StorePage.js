import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function StorePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (filterType ? product.type === filterType : true));

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[productId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [productId]: newQuantity };
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ready to Cook Food Store</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <select
          className="form-control"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p><strong>Calories:</strong> {product.calories}</p>
                <p>{product.shortDescription}</p>

                {/* View Button */}
                <Link to={`/store/${product._id}`} className="btn btn-primary mb-2">
                  View
                </Link>

                {/* Add to Cart Button */}
                {cart[product._id] ? (
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => updateQuantity(product._id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{cart[product._id]}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => updateQuantity(product._id, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorePage;
