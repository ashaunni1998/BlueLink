import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
const dummyOrders = [
  {
    id: 'ORD001',
    products: [
      { name: 'Business Cards', quantity: 100, price: 49.99, image: '/assets/cards/card1.jpg' },
    ],
  },
  {
    id: 'ORD002',
    products: [
      { name: 'Flyers', quantity: 200, price: 89.00, image: '/assets/flyers/small-flyer.png' },
    ],
  },
  {
    id: 'ORD003',
    products: [
      { name: 'Posters', quantity: 50, price: 120.5, image: '/assets/tshirt/back.jpg' },
    ],
  },
];

const OrderDetails = () => {
  const { id } = useParams();
  const order = dummyOrders.find(o => o.id === id);

  if (!order) return <p style={{ padding: '20px' }}>Order not found.</p>;

  return (
     <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '90%', margin: '0 auto' }}>
              <Header/>
    <div style={{ padding: '20px' }}>
      <h2>Order #{order.id}</h2>
      {order.products.map((product, index) => (
        <div key={index} style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
          <img src={product.image} alt="Product" width="80" />
          <div>
            <p><strong>{product.name}</strong></p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </div>
    </div>
  );
};

export default OrderDetails;
