// planeat-frontend\src\pages\CheckoutPage.js

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, remove, push, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutPage() {
  const auth = getAuth();
  const database = getDatabase();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(user?.uid || null);
  const [cartItems, setCartItems] = useState([]);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
  });
  const [useBillingAsShipping, setUseBillingAsShipping] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!user) {
        setErrorMessage('User not logged in.');
        return;
    }

    setUserId(user.uid);

    const cartRef = ref(database, `carts/${user.uid}`);
    onValue(cartRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const items = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));

            const total = items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            const calculatedTax = total * 0.13;
            setCartItems(items);
            setTax(calculatedTax.toFixed(2));
            setTotalPrice((total + calculatedTax).toFixed(2));
        } else {
            setCartItems([]);
            setTax(0);
            setTotalPrice(0);
        }
    });
}, [user, database]);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://api.countrystatecity.in/v1/countries/CA/states', {
        headers: { 'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==' },
      });
      setProvinces(response.data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchCities = async (provinceCode) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/CA/states/${provinceCode}/cities`,
        { headers: { 'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==' } }
      );
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

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
      !billingAddress.province ||
      !billingAddress.city ||
      !billingAddress.postalCode
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
        !shippingAddress.province ||
        !shippingAddress.city ||
        !shippingAddress.postalCode)
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

        await set(newOrderRef, {
          billingAddress,
          shippingAddress: useBillingAsShipping ? billingAddress : shippingAddress,
          orderDate: new Date().toISOString(),
          items: cartItems,
          tax,
          totalPrice,
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
      <div className="row">
        <div className="col-md-8">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
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
                  <label>Province</label>
                  <select
                    className="form-control"
                    name="province"
                    value={billingAddress.province}
                    onChange={(e) => {
                      handleInputChange(e, setBillingAddress);
                      fetchCities(e.target.value);
                    }}
                  >
                    <option value="">Select a Province</option>
                    {provinces.map((province) => (
                      <option key={province.iso2} value={province.iso2}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>City</label>
                  <select
                    className="form-control"
                    name="city"
                    value={billingAddress.city}
                    onChange={(e) => handleInputChange(e, setBillingAddress)}
                  >
                    <option value="">Select a City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
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
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="useBillingAsShipping"
                    checked={useBillingAsShipping}
                    onChange={(e) => setUseBillingAsShipping(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="useBillingAsShipping">
                    Same as Billing Address
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <h3>Shipping Address</h3>
                <div className="form-group mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={(e) => handleInputChange(e, setShippingAddress)}
                    disabled={useBillingAsShipping}
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
                    disabled={useBillingAsShipping}
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
                    disabled={useBillingAsShipping}
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
                    disabled={useBillingAsShipping}
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
                    disabled={useBillingAsShipping}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Province</label>
                  <select
                    className="form-control"
                    name="province"
                    value={shippingAddress.province}
                    onChange={(e) => {
                      handleInputChange(e, setShippingAddress);
                      fetchCities(e.target.value);
                    }}
                    disabled={useBillingAsShipping}
                  >
                    <option value="">Select a Province</option>
                    {provinces.map((province) => (
                      <option key={province.iso2} value={province.iso2}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>City</label>
                  <select
                    className="form-control"
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleInputChange(e, setShippingAddress)}
                    disabled={useBillingAsShipping}
                  >
                    <option value="">Select a City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={(e) => handleInputChange(e, setShippingAddress)}
                    disabled={useBillingAsShipping}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Complete Checkout
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <div
            className="order-details p-3"
            style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <h4 className="mb-3">Order Details</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Tax</td>
                  <td>${tax}</td>
                </tr>
                <tr>
                  <td colSpan="2">Total</td>
                  <td>${totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
