import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, remove, push, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For fetching product details from MongoDB

function CheckoutPage() {
  const auth = getAuth();
  const database = getDatabase();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      setUserId(user.uid);

      // Fetch cart items from Firebase
      const cartRef = ref(database, `carts/${user.uid}`);
      onValue(cartRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const items = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          // Fetch product details from MongoDB for each item
          const detailedItems = await Promise.all(
            items.map(async (item) => {
              try {
                const response = await axios.get(`/api/products/${item.productId}`);
                return {
                  ...item,
                  name: response.data.name,
                  price: response.data.price,
                  imageUrl: response.data.imageUrl,
                };
              } catch (error) {
                console.error('Error fetching product details:', error);
                return { ...item }; // Return the item without additional details if an error occurs
              }
            })
          );

          setCartItems(detailedItems);
        } else {
          setCartItems([]);
        }
      });
    } else {
      setErrorMessage('User not logged in.');
    }
  }, [user, database]);

  const handleInputChange = (e, setAddress) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !billingAddress.firstName ||
      !billingAddress.lastName ||
      !billingAddress.email ||
      !billingAddress.phone ||
      !billingAddress.address ||
      !billingAddress.city ||
      !billingAddress.postalCode ||
      !billingAddress.country
    ) {
      setErrorMessage('Please fill all billing address fields.');
      return;
    }

    if (
      !useBillingAsShipping &&
      (!shippingAddress.firstName ||
        !shippingAddress.lastName ||
        !shippingAddress.email ||
        !shippingAddress.phone ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.postalCode ||
        !shippingAddress.country)
    ) {
      setErrorMessage('Please fill all shipping address fields.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    try {
      if (userId) {
        const orderRef = ref(database, `orders/${userId}`);
        const newOrderRef = push(orderRef);

        const totalPrice = cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const tax = totalPrice * 0.13;

        await set(newOrderRef, {
          billingAddress,
          shippingAddress: useBillingAsShipping ? billingAddress : shippingAddress,
          orderDate: new Date().toISOString(),
          items: cartItems,
          tax: tax.toFixed(2),
          totalPrice: (totalPrice + tax).toFixed(2),
        });

        const cartRef = ref(database, `carts/${userId}`);
        await remove(cartRef);

        alert('Checkout successful! Your order has been placed.');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setErrorMessage('Failed to complete checkout. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Billing Address</h3>
        <div className="form-group mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={billingAddress.firstName}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={billingAddress.lastName}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={billingAddress.email}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={billingAddress.phone}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={billingAddress.address}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={billingAddress.city}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Postal Code</label>
          <input
            type="text"
            className="form-control"
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={billingAddress.country}
            onChange={(e) => handleInputChange(e, setBillingAddress)}
          />
        </div>
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="useBillingAsShipping"
            checked={useBillingAsShipping}
            onChange={(e) => setUseBillingAsShipping(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="useBillingAsShipping">
            Shipping address is the same as billing address
          </label>
        </div>
        {!useBillingAsShipping && (
          <>
            <h3>Shipping Address</h3>
            <div className="form-group mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={shippingAddress.firstName}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={shippingAddress.lastName}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={shippingAddress.email}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={shippingAddress.address}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Postal Code</label>
              <input
                type="text"
                className="form-control"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={shippingAddress.country}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Complete Checkout
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
