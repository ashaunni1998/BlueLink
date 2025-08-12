import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // adjust path
import './Home.css';

const AccountPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // If storing user in context

  // Normalize tabs
  const queryParams = new URLSearchParams(location.search);
  const normalizeTab = (tab) => {
    const mapping = {
      orders: 'orderhistory',
      overview: 'overview',
      address: 'address'
    };
    return mapping[tab?.toLowerCase()] || 'overview';
  };

  const defaultTab = normalizeTab(queryParams.get('tab'));
  const [activeSection, setActiveSection] = useState(defaultTab);

  useEffect(() => {
    const newTab = new URLSearchParams(location.search).get('tab');
    if (newTab && normalizeTab(newTab) !== activeSection) {
      setActiveSection(normalizeTab(newTab));
    }
  }, [location]);

  // Sections data
  const sections = {
    overview:
      'Welcome to your Blue Link Printing dashboard. From your account dashboard you can view your recent orders, manage your shipping and billing addresses, manage your order return, view your orders, and edit your password and account details.',
    orderhistory: 'Here you can view and track your orders.',
    address: 'Manage your shipping and billing addresses.'
  };

  const orders = [
    { id: 'ORD001', product: 'Business Cards', date: '2025-07-20', amount: '$49.99' },
    { id: 'ORD002', product: 'Flyers', date: '2025-07-25', amount: '$89.00' },
    { id: 'ORD003', product: 'Posters', date: '2025-08-01', amount: '$120.50' }
  ];

  const customerInfo = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8901',
    address: '123 Main Street, Springfield, IL 62704, USA'
  };

  // Logout handler
const handleLogout = async () => {
  try {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
  } catch (err) {
    console.error('Logout request failed', err);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/sign-in');
  }
};


  // Styles
  const layoutStyle = {
    display: 'flex',
    flex: 1,
    flexDirection: window.innerWidth < 768 ? 'column' : 'row'
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
    maxHeight: '300px'
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
    whiteSpace: 'nowrap'
  });

  const logoutButtonStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    marginTop: window.innerWidth < 768 ? '0' : '20px',
    marginRight: window.innerWidth < 768 ? '10px' : '0',
    whiteSpace: 'nowrap'
  };

  const contentStyle = { flex: 1, padding: '30px' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse' };
  const thTdStyle = { border: '1px solid #ccc', padding: '12px', textAlign: 'left' };
  const viewButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <div className="responsive-container">
      <Header />
      <div style={layoutStyle}>
        {/* Sidebar */}
        <nav style={sidebarStyle}>
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              style={buttonStyle(activeSection === key)}
              onClick={() => setActiveSection(key)}
            >
              {key === 'overview' && 'Overview'}
              {key === 'orderhistory' && 'Order History'}
              {key === 'address' && 'Address'}
            </button>
          ))}
          {/* Logout Button */}
          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Content */}
        <main style={contentStyle}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', textTransform: 'capitalize' }}>
            {activeSection.replace('-', ' ')}
          </h2>

          {activeSection === 'orderhistory' ? (
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
                      <Link to={`/orders/${order.id}`}>
                        <button style={viewButtonStyle}>View</button>
                      </Link>
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
      <Footer />
    </div>
  );
};

export default AccountPage;
