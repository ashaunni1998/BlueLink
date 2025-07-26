import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const countries = [
  "India", "United States", "United Kingdom", "Albania", "American Samoa", "Andorra", "Angola",
  "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia"
];

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'India',
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div style={{ width: "100%", boxSizing: "border-box" }}>
      <Header />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
        padding: isMobile ? '20px 10px' : '40px',
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          padding: isMobile ? '20px' : '40px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create an account</h2>
          <form onSubmit={handleSubmit}>
            {renderInputRow("First name", "firstName", "text", formData.firstName, handleChange, isMobile)}
            {renderInputRow("Last name", "lastName", "text", formData.lastName, handleChange, isMobile)}
            {renderInputRow("Email address", "email", "email", formData.email, handleChange, isMobile)}
            {renderInputRow("Password", "password", "password", formData.password, handleChange, isMobile)}
            {renderInputRow("Confirm password", "confirmPassword", "password", formData.confirmPassword, handleChange, isMobile)}

            {/* Country Dropdown */}
            <div style={rowStyle(isMobile)}>
              <label style={labelStyle(isMobile)}>Where are you?</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={inputStyle}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              style={{
                backgroundColor: '#1abc9c',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '4px',
                marginTop: '20px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              Create Account
            </button>

            {/* Sign In Redirect */}
            <button
              type="button"
              onClick={() => navigate('/sign-in')}
              style={{
                backgroundColor: 'transparent',
                color: '#007bff',
                padding: '12px',
                border: 'none',
                marginTop: '10px',
                width: '100%',
                textAlign: 'center',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px',
              }}
            >
              Already have an account? Sign In
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Input field + label (responsive)
const renderInputRow = (label, name, type, value, handleChange, isMobile) => (
  <div style={rowStyle(isMobile)}>
    <label style={labelStyle(isMobile)}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={label}
      style={inputStyle}
    />
  </div>
);

// Styles
const rowStyle = (isMobile) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: isMobile ? 'flex-start' : 'center',
  marginBottom: '16px',
});

const labelStyle = (isMobile) => ({
  width: isMobile ? '100%' : '150px',
  fontWeight: 'bold',
  marginBottom: isMobile ? '6px' : '0',
  marginRight: isMobile ? '0' : '10px',
});

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

export default SignUp;
