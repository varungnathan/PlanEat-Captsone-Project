import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hst, setHst] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCartItems = useCallback(async () => {
    if (!user) {
      setErrorMessage('Please log in to view your cart.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${user.uid}`);
      const items = response.data.items || [];
      setCartItems(items);
      calculateTotals(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setErrorMessage('Failed to load cart items.');
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const calculateTotals = (items) => {
    if (!items || items.length === 0) {
      setTotalPrice(0);
      setHst(0);
      setGrandTotal(0);
      return;
    }

    const total = items.reduce((acc, item) => {
      const price = item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0);

    const hstAmount = total * 0.13;
    setTotalPrice(total);
    setHst(hstAmount);
    setGrandTotal(total + hstAmount);
  };

  const handleQuantityChange = async (productId, delta) => {
    if (!user) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${user.uid}`, {
        productId,
        delta,
      });

      const updatedItems = response.data.items || [];
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!user) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${user.uid}/${productId}`);
      const updatedItems = response.data.items || [];
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleEditItem = (productId) => {
    navigate(`/store/${productId}`);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (!user) {
    return <div className="container mt-5">{errorMessage}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="row mb-4 align-items-center" key={item.productId?._id || item._id}>
                <div className="col-md-2">
                  {item.productId?.imageUrl ? (
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name || 'Unknown Product'}
                      className="img-fluid"
                      style={{ maxHeight: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ height: '100px', background: '#f0f0f0' }}>No Image</div>
                  )}
                </div>
                <div className="col-md-4">
                  <h5>{item.productId?.name || 'Unknown Product'}</h5>
                  <p>${item.productId?.price?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleQuantityChange(item.productId?._id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleQuantityChange(item.productId?._id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEditItem(item.productId?._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(item.productId?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="text-end">
            <h4>Subtotal: ${totalPrice.toFixed(2)}</h4>
            <h4>HST (13%): ${hst.toFixed(2)}</h4>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <button className="btn btn-secondary mt-3 me-3" onClick={() => navigate('/store')}>
              Continue Shopping
            </button>
            <button className="btn btn-primary mt-3" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
