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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("https://kerala-digital-park-server.vercel.app/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          country: formData.country,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/sign-in");
      } else {
        setErrors({ general: data.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
       <div  style={{width:"90%"}} className="mx-auto">  
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

          {errors.general && (
            <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderInputRow("First name", "firstName", "text", formData.firstName, handleChange, errors.firstName, isMobile)}
            {renderInputRow("Last name", "lastName", "text", formData.lastName, handleChange, errors.lastName, isMobile)}
            {renderInputRow("Email address", "email", "email", formData.email, handleChange, errors.email, isMobile)}
            {renderInputRow("Password", "password", "password", formData.password, handleChange, errors.password, isMobile)}
            {renderInputRow("Confirm password", "confirmPassword", "password", formData.confirmPassword, handleChange, errors.confirmPassword, isMobile)}

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#999' : '#1abc9c',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '4px',
                marginTop: '20px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            {/* Sign In Link */}
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

</div>
  );
};

const renderInputRow = (label, name, type, value, handleChange, error, isMobile) => (
  <div style={rowStyle(isMobile)}>
    <label style={labelStyle(isMobile)}>{label}</label>
    <div style={{ width: '100%' }}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={label}
        style={inputStyle}
      />
      {error && <div style={{ color: 'red', fontSize: '13px', marginTop: '4px' }}>{error}</div>}
    </div>
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
