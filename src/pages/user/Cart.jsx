import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Premium Business Cards',
      desc: '300gsm, Matte Finish, Double-sided',
      details: 'Size: 3.5" x 2" | Quantity: 100 cards',
      price: 499,
      qty: 1,
      image: 'assets/images/products/business-card.jpg',
    },
    {
      id: 2,
      name: 'Thank You Cards',
      desc: '250gsm, Gloss Finish',
      details: 'Size: 4" x 6" | Quantity: 50 cards',
      price: 299,
      qty: 1,
      image: 'assets/images/products/posters.jpg',
    },
  ]);

  const handleQtyChange = (id, value) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, value) } : item
      )
    );
  };

  const handleRemove = id => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
       <div style={{ width: '90%', margin: '0 auto' }}>
             <Header/>
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F9FAFB',
        padding: '2.5rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>
          🛒 Your Cart
        </h2>

        {items.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              borderBottom: '1px solid #E5E7EB',
              paddingBottom: '1.5rem',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '7rem',
                height: '7rem',
                objectFit: 'cover',
                borderRadius: '0.375rem',
                border: '1px solid #E5E7EB',
              }}
            />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{item.name}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item.desc}</p>
              <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item.details}</p>

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <label style={{ fontSize: '0.875rem', color: '#4B5563' }}>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => handleQtyChange(item.id, parseInt(e.target.value))}
                  style={{
                    width: '4rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.875rem',
                  }}
                />
              </div>
            </div>
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1F2937' }}>
                ₹{(item.qty * item.price).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  fontSize: '0.875rem',
                  color: '#EF4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginTop: '0.5rem',
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Summary */}
        <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6B7280' }}>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6B7280' }}>
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: '600',
              fontSize: '1.125rem',
              color: '#1F2937',
              borderTop: '1px solid #E5E7EB',
              paddingTop: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <a href="/" style={{ color: '#2563EB', fontSize: '0.875rem', textDecoration: 'underline' }}>
            
            <button
            style={{
              backgroundColor: '#2563EB',
              color: '#fff',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              border: 'none',
            }}
          >
      ← Continue Shopping
          </button>
          </a>
         <a href="/checkout "> <button
            style={{
              backgroundColor: '#2563EB',
              color: '#fff',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Proceed to Checkout
          </button>
          </a>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    </div>
  );
};

export default Cart;
