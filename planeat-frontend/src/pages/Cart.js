// planeat-frontend\src\pages\Cart.js

import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, set, update, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const auth = getAuth();
  const user = auth.currentUser;
  const database = getDatabase();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hst, setHst] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setErrorMessage('Please log in to view your cart.');
      return;
    }

    const cartRef = ref(database, `carts/${user.uid}`);
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setCartItems(items);
        calculateTotals(items);
      } else {
        setCartItems([]);
        calculateTotals([]);
      }
    });
  }, [user, database]);

  const calculateTotals = (items) => {
    if (!items || items.length === 0) {
      setTotalPrice(0);
      setHst(0);
      setGrandTotal(0);
      return;
    }

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const hstAmount = total * 0.13;
    setTotalPrice(total);
    setHst(hstAmount);
    setGrandTotal(total + hstAmount);
  };

  const handleQuantityChange = (id, delta) => {
    if (!user) return;

    const itemRef = ref(database, `carts/${user.uid}/${id}`);
    const currentItem = cartItems.find((item) => item.id === id);

    if (currentItem.quantity + delta > 0) {
      update(itemRef, {
        quantity: currentItem.quantity + delta,
      });
    } else {
      remove(itemRef);
    }
  };

  const handleRemoveItem = (id) => {
    if (!user) return;

    const itemRef = ref(database, `carts/${user.uid}/${id}`);
    remove(itemRef);
  };

  const handleEditItem = (id) => {
    navigate(`/store/${id}`);
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
              <div className="row mb-4 align-items-center" key={item.id}>
                <div className="col-md-2">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name || 'Unknown Product'}
                      className="img-fluid"
                      style={{ maxHeight: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ height: '100px', background: '#f0f0f0' }}>No Image</div>
                  )}
                </div>
                <div className="col-md-4">
                  <h5>{item.name || 'Unknown Product'}</h5>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEditItem(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(item.id)}
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
