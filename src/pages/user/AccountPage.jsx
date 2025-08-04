import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sections = {
    dashboard: 'Welcome to your Blue Link Printing dashboard.From your account dashboard you can view your recent orders, manage your shipping and billing addresses,manage your order return,view your orders and edit your password and account details.',
    orders: 'Here you can view and track your orders.',
    address: 'Manage your shipping and billing addresses.',
    // returns: 'Submit or track your return requests.',
    logout: 'You have been logged out.',
  };

  const orders = [
    {
      id: 'ORD001',
      product: 'Business Cards',
      date: '2025-07-20',
      amount: '$49.99',
    },
    {
      id: 'ORD002',
      product: 'Flyers',
      date: '2025-07-25',
      amount: '$89.00',
    },
    {
      id: 'ORD003',
      product: 'Posters',
      date: '2025-08-01',
      amount: '$120.50',
    },
  ];



  const customerInfo = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 234 567 8901',
  address: '123 Main Street, Springfield, IL 62704, USA',
};



  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    
  };

  const layoutStyle = {
    display: 'flex',
    flex: 1,
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
  };

  const sidebarStyle = {
    backgroundColor: '#f1f1f1',
    width: window.innerWidth < 768 ? '100%' : '250px',
    padding: '20px',
    borderBottom: window.innerWidth < 768 ? '1px solid #ccc' : 'none',
    borderRight: window.innerWidth >= 768 ? '1px solid #ccc' : 'none',
    display: 'flex',
    flexDirection: window.innerWidth < 768 ? 'row' : 'column',
    overflowX: 'auto',
     alignItems: 'flex-start',
  maxHeight: '300px',
  };

  const buttonStyle = (active) => ({
    padding: '10px 15px',
    marginBottom: window.innerWidth < 768 ? '0' : '10px',
    marginRight: window.innerWidth < 768 ? '10px' : '0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: active ? '#007BFF' : 'transparent',
    color: active ? '#fff' : '#333',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  });

  const contentStyle = {
    flex: 1,
    padding: '30px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '12px',
    textAlign: 'left',
  };

  const viewButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };


  return (
     <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
    <div style={{ width: '90%', margin: '0 auto' }}>
    <div style={containerStyle}>
        <Header/>
      <div style={layoutStyle}>

        {/* Sidebar */}
        <nav style={sidebarStyle}>
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              style={buttonStyle(activeSection === key)}
              onClick={() => setActiveSection(key)}
            >
              {key === 'dashboard' && 'Dashboard'}
              {key === 'orders' && 'Orders'}
              {key === 'address' && 'Address'}
              {key === 'returns' && 'Return Request'}
              {key === 'logout' && 'Logout'}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main style={contentStyle}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', textTransform: 'capitalize' }}>
            {activeSection.replace('-', ' ')}
          </h2>


      {activeSection === 'orders' ? (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thTdStyle}>Order ID</th>
        <th style={thTdStyle}>Product Name</th>
        <th style={thTdStyle}>Date</th>
        <th style={thTdStyle}>Amount</th>
        <th style={thTdStyle}>Action</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
          <td style={thTdStyle}>{order.id}</td>
          <td style={thTdStyle}>{order.product}</td>
          <td style={thTdStyle}>{order.date}</td>
          <td style={thTdStyle}>{order.amount}</td>
          <td style={thTdStyle}>
            <button style={viewButtonStyle}>View</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : activeSection === 'address' ? (
  <div style={{ fontSize: '16px', color: '#333', lineHeight: '1.8' }}>
    <p><strong>Name:</strong> {customerInfo.name}</p>
    <p><strong>Email:</strong> {customerInfo.email}</p>
    <p><strong>Phone:</strong> {customerInfo.phone}</p>
    <p><strong>Address:</strong> {customerInfo.address}</p>
  </div>
) : (
  <p style={{ color: '#555', fontSize: '16px' }}>{sections[activeSection]}</p>
)}
     

 


          
          </main>
      </div>
      </div>
      <Footer/>
      </div>
    </div>
  );
};

export default AccountPage;
