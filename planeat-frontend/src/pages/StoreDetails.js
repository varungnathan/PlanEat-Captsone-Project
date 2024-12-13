// planeat-frontend\src\pages\StoreDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDatabase, ref, onValue, set, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import '../pagestyles/StoreDetails.css';

function StoreDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const database = getDatabase();
  const user = auth.currentUser;

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loginModal, setLoginModal] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [shippingMessage, setShippingMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const recResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const recData = await recResponse.json();
        setRecommendations(recData.filter((p) => p._id !== id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      setLoginModal(true);
      return;
    }

    try {
      const cartRef = ref(database, `carts/${user.uid}/${product._id}`);
      onValue(
        cartRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const existingData = snapshot.val();
            update(cartRef, { quantity: existingData.quantity + quantity });
          } else {
            set(cartRef, {
              name: product.name,
              price: product.price,
              quantity,
              imageUrl: product.imageUrl,
            });
          }
        },
        { onlyOnce: true }
      );
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart.');
    }
  };

  const handleLoginRedirect = () => {
    setLoginModal(false);
    navigate('/login');
  };

  const handleCheckShipping = () => {
    const regex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
    if (regex.test(postalCode)) {
      setShippingMessage('Shipping is available and will arrive within 2 days.');
    } else {
      setShippingMessage('Invalid postal code format. Please use A1A1A1 format.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid product-image"
          />
          {product.nutritionalInfo && (
            <div className="nutritional-info mt-4">
              <h3>Nutritional Information</h3>
              <table className="table nutritional-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price?.toFixed(2)}</p>
          <div className="product-tags">
            <span className="country-tag">{product.origin}</span>
            <span
              className={`type-tag ${product.type === 'Veg' ? 'veg' : 'non-veg'}`}
            >
              <span
                className="material-symbols-outlined type-icon"
                style={{
                  color: product.type === 'Veg' ? '#228B22' : '#D32F2F',
                }}
              >
                {product.type === 'Veg' ? 'eco' : ''}
              </span>
              {product.type}
            </span>
          </div>
          <div className="quantity-selector d-flex align-items-center mb-3 mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button
              className="btn btn-secondary"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="btn btn-success mb-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <div className="product-details mt-4">
            <h3>About the Product</h3>
            <p>{product.longDescription || product.shortDescription}</p>
            {product.history && (
              <div className="mt-4">
                <h4>History</h4>
                <p>{product.history}</p>
              </div>
            )}
            {product.purchaseInfo && (
              <div className="mt-4">
                <h4>Purchase Information</h4>
                <p>{product.purchaseInfo}</p>
                <div className="mt-3">
                  <label htmlFor="postalCode">Check Shipping Availability</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control me-2"
                      id="postalCode"
                      placeholder="Enter postal code (e.g., A1A1A1)"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleCheckShipping}>
                      Check
                    </button>
                  </div>
                  {shippingMessage && <p className="mt-2">{shippingMessage}</p>}
                </div>
              </div>
            )}
            {product.giftOptions && (
              <div className="mt-4">
                <h4>Gift Options</h4>
                <p>{product.giftOptions}</p>
              </div>
            )}
            {product.technicalDetails && (
              <div className="mt-4">
                <h4>Technical Details</h4>
                <p>{product.technicalDetails}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="recommendations mt-5">
        <h3>Recommended Products</h3>
        <div className="row">
          {recommendations.map((recProduct) => (
            <div className="col-md-3" key={recProduct._id}>
              <div className="card recommendation-card">
                <img
                  src={recProduct.imageUrl}
                  alt={recProduct.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{recProduct.name}</h5>
                  <p>${recProduct.price?.toFixed(2)}</p>
                  <Link to={`/store/${recProduct._id}`} className="btn btn-primary btn-sm">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loginModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Required</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setLoginModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>You need to log in to add items to your cart.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setLoginModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleLoginRedirect}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreDetails;
