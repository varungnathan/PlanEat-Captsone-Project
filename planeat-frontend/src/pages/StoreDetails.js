import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import '../pagestyles/StoreDetails.css';

function StoreDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);

        const recResponse = await axios.get('http://localhost:5000/api/products');
        const filteredRecommendations = recResponse.data.filter((p) => p._id !== id).slice(0, 4);
        setRecommendations(filteredRecommendations);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const isVeg = product.type === 'Veg';

  const handleAddToCart = async () => {
    if (!user) {
      setLoginModal(true);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/cart/${user.uid}`, {
        productId: product._id,
        quantity,
      });
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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid product-image"
          />
        </div>
        <div className="col-md-6">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price?.toFixed(2) || 'N/A'}</p>
          <div className="product-tags">
            <span className="country-tag">{product.origin}</span>
            <span className={`type-tag ${isVeg ? 'veg' : 'non-veg'}`}>
              <span
                className="material-symbols-outlined type-icon"
                style={{
                  color: isVeg ? '#228B22' : '#D32F2F',
                }}
              >
                {isVeg ? 'eco' : 'square_dot'}
              </span>
              {isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          <p className="product-description">{product.longDescription || product.shortDescription}</p>
          <div className="quantity-selector d-flex align-items-center mb-3">
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
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
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
                  <p>${recProduct.price?.toFixed(2) || 'N/A'}</p>
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
