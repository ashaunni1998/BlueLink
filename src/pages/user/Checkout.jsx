import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ MOCK payment function (no real Stripe)
  const handleMockCheckout = () => {
    console.log('Mock payment data:', formData);
    alert('🧾 Order placed successfully! (Mock)');
  };

  return (
     <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '50px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>Checkout</h2>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '40px',
          }}
        >
          {/* Billing Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleMockCheckout();
            }}
            style={{
              flex: 1,
              minWidth: '300px',
              background: '#f9f9f9',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Billing Information</h3>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />

            <div style={{ marginTop: '20px' }}>
              <label style={{ fontWeight: 'bold' }}>Shipping Method:</label>
              <p style={{ margin: '5px 0' }}>Standard Delivery (3–5 days) – <strong>Free</strong></p>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label style={{ fontWeight: 'bold' }}>Payment Method:</label>
              <p style={{ margin: '5px 0' }}>Credit/Debit Card (Mock Payment)</p>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '20px',
                padding: '14px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Complete Order
            </button>
          </form>

          {/* Order Summary */}
          <div
            style={{
              flex: 1,
              minWidth: '300px',
              background: '#ffffff',
              padding: '30px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Order Summary</h3>

            <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p style={{ fontWeight: 'bold' }}>Flyer Printing</p>
              <p style={{ margin: '5px 0' }}>Qty: 100</p>
              <p style={{ margin: '5px 0' }}>Price: ₹500</p>
            </div>

            <div style={{ fontSize: '16px' }}>
              <p>Subtotal: ₹500</p>
              <p>Shipping: ₹0.00</p>
              <p style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '10px' }}>
                Total: ₹500
              </p>
            </div>

            <div style={{ marginTop: '20px', background: '#f3f3f3', padding: '10px', borderRadius: '5px' }}>
              <p style={{ fontSize: '14px', margin: 0 }}>
                <strong>Estimated Delivery:</strong> Aug 4 – Aug 6, 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </div>
  );
};

export default Checkout;
