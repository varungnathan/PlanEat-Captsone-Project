import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const database = getDatabase();
      const ordersRef = ref(database, `orders/${user.uid}`);

      onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ordersArray = Object.entries(data).map(([id, order]) => ({
            id,
            ...order,
          }));
          setOrders(ordersArray);
        } else {
          setOrders([]);
        }
      });
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Orders</h2>
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.id}</h5>
                  <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                  <h6>Billing Address</h6>
                  <p>{`${order.billingAddress.firstName} ${order.billingAddress.lastName}`}</p>
                  <p>{`${order.billingAddress.address}, ${order.billingAddress.city}, ${order.billingAddress.country}`}</p>
                  <h6>Shipping Address</h6>
                  <p>{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</p>
                  <p>{`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You have no orders yet.</p>
      )}
    </div>
  );
}

export default OrdersPage;
