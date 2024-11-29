import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function OrdersPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const database = getDatabase();

  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user) {
      setErrorMessage('You need to log in to view your orders.');
      return;
    }

    const ordersRef = ref(database, `orders/${user.uid}`);
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ordersList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOrders(ordersList);
      } else {
        setOrders([]);
      }
    });
  }, [user, database]);

  const downloadReceipt = (order) => {
    if (!order.items || order.items.length === 0) {
      alert('No items found in this order to generate a receipt.');
      return;
    }

    const doc = new jsPDF();

    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('PlanEat', 105, 10, null, null, 'center');
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text('299 Doon Valley Dr, Kitchener, ON CA, N2G 4M4', 105, 15, null, null, 'center');
    doc.text('Phone: +1 2268999660', 105, 20, null, null, 'center');
    doc.text('E-Mail: innovators@conestogac.on.ca', 105, 25, null, null, 'center');

    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text('Order Confirmation', 10, 35);

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`Order ID: ${order.id}`, 10, 45);
    doc.text(`Date: ${new Date(order.orderDate || Date.now()).toLocaleDateString()}`, 10, 50);

    doc.setFont('times', 'bold');
    doc.text('Billing Address', 10, 60);
    doc.text('Shipping Address', 110, 60);

    doc.setFont('times', 'normal');
    doc.text(
      `${order.billingAddress?.firstName || ''} ${order.billingAddress?.lastName || ''}`,
      10,
      65
    );
    doc.text(order.billingAddress?.address || '', 10, 70);
    doc.text(
      `${order.billingAddress?.city || ''}, ${order.billingAddress?.postalCode || ''}`,
      10,
      75
    );
    doc.text(order.billingAddress?.country || '', 10, 80);

    doc.text(
      `${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}`,
      110,
      65
    );
    doc.text(order.shippingAddress?.address || '', 110, 70);
    doc.text(
      `${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postalCode || ''}`,
      110,
      75
    );
    doc.text(order.shippingAddress?.country || '', 110, 80);

    const customerName = order.billingAddress?.firstName || 'Customer';
    doc.setFont('times', 'bold');
    doc.text(`Dear ${customerName}, thank you for shopping with us!`, 10, 90);
    doc.text('Here are the order details:', 10, 100);

    const tableColumnHeaders = ['Item #', 'Description', 'Quantity', 'Price', 'Total'];
    const tableRows = order.items.map((item, index) => [
      index + 1,
      item.name || 'Unknown Product',
      item.quantity || 1,
      `$${Number(item.price || 0).toFixed(2)}`,
      `$${Number(item.price * item.quantity || 0).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [tableColumnHeaders],
      body: tableRows,
      startY: 110,
      theme: 'grid',
      styles: { font: 'times', fontSize: 10 },
      headStyles: { fillColor: [211, 211, 211], textColor: 0 },
    });

    const subtotal = order.items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
    const tax = Number(order.tax || 0).toFixed(2);
    const totalPrice = Number(order.totalPrice || 0).toFixed(2);

    const totalTableBody = [
      ['Subtotal', `$${subtotal}`],
      ['Tax', `$${tax}`],
      ['Total After Tax', `$${totalPrice}`],
    ];

    doc.autoTable({
      body: totalTableBody,
      startY: doc.lastAutoTable.finalY + 10,
      theme: 'grid',
      styles: { font: 'times', fontSize: 10 },
      headStyles: { fillColor: [255, 255, 255], textColor: 0 },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold', cellWidth: 45 },
        1: { halign: 'right', cellWidth: 45 },
      },
      tableWidth: 90,
      margin: { left: 105 },
    });

    const additionalY = doc.lastAutoTable.finalY + 20;

    doc.setFont('times', 'bold');
    doc.text('Return and Refund Policy', 10, additionalY);
    doc.setFont('times', 'normal');
    doc.text(
      'If you’re not satisfied with your purchase, you may return it within 30 days.',
      10,
      additionalY + 10
    );
    doc.text('Visit our website for more details.', 10, additionalY + 15);

    doc.setFont('times', 'bold');
    doc.text('Support Information', 10, additionalY + 30);
    doc.setFont('times', 'normal');
    doc.text('Need assistance? Contact us at +1 2268999660 or', 10, additionalY + 40);
    doc.text('email us at innovators@conestogac.on.ca.', 10, additionalY + 45);

    doc.setFont('times', 'bold');
    doc.text('Exclusive Discount Code', 10, additionalY + 60);
    doc.setFont('times', 'normal');
    doc.text('Use code THANKYOU20 for 20% off your next order.', 10, additionalY + 70);
    doc.text('Valid until: 12/31/2024', 10, additionalY + 75);

    doc.save(`Order_${order.id}.pdf`);
  };

  if (!user) {
    return <div className="container mt-5">{errorMessage}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Item Details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Shipping Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      <strong>{item.name || 'Unknown Product'}</strong>
                    </div>
                  ))}
                </td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>{item.quantity || 1}</div>
                  ))}
                </td>
                <td>${Number(order.totalPrice || 0).toFixed(2)}</td>
                <td>
                  {`${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}, ${order.shippingAddress?.address || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postalCode || ''}, ${order.shippingAddress?.country || ''}`}
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => downloadReceipt(order)}
                  >
                    Download Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersPage;
