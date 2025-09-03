// src/pages/user/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

import axios from "axios";
import API_BASE_URL from "../../config";
import CheckoutForm from "./CheckoutForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
axios.defaults.withCredentials = true;

const Checkout = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    streetNumber: "",
    unitNumber: "",
    suburb: "",
    city: "",
    region: "",
    postalCode: "",
    landmark: "",
    addressType: "Home",
    isDefault: false,
    country: "New Zealand",
  });
const [addressError, setAddressError] = useState("");   // for error messages
// const [showNewAddressForm, setShowNewAddressForm] = useState(false); // toggle form

  // ✅ Fetch addresses (cookie auth)
 const fetchAddresses = async () => {
  try {
    console.log("📤 Sending GET /address/addresses with cookies");
    console.log("Fetching addresses from:", `${API_BASE_URL}/address/addresses`);
    const res = await axios.get(`https://kerala-digital-park-server.vercel.app/api/address/addresses`, {
      withCredentials: true,
    });

    // console.log("📥 Raw address API response:", res.data);
    setAddresses(res.data.addresses || []);
  } catch (err) {
    console.error("❌ Error fetching addresses:", err);
  
  }
  
};

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    const totalPrice = savedCart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setTotal(totalPrice);
  }, []);

  // ✅ Add address
// inside Checkout.jsx
// ✅ Updated handleAddAddress using axios
const handleAddAddress = async (e) => {
  e.preventDefault(); // prevent page reload
console.log("worked");
  try {
    const addressData = {
      fullName: newAddress.fullName,
      phone: newAddress.phone,
      street: newAddress.street,
      streetNumber: newAddress.streetNumber,
      unitNumber: newAddress.unitNumber,
      suburb: newAddress.suburb,
      city: newAddress.city,
      region: newAddress.region,
      postalCode: newAddress.postalCode,
      landmark: newAddress.landmark,
      addressType: newAddress.addressType,
      
    };

    //  console.log("Sending address payload:", addressData);

    // ✅ Use axios (with credentials for auth/session)
    //  console.log("📤 Sending POST /address/add payload:", addressData);
    // const response = await axios.post(
    //   `https://kerala-digital-park-server.vercel.app/api/address/add`,
    //   addressData,
    //   { withCredentials: true }
    // );

     const response = await axios.post(
      'https://kerala-digital-park-server.vercel.app/api/address/add',
      addressData,
      { withCredentials: true }
    );

    console.log("📥 Response from add:", response.data);

    // ✅ Reset form after success
    setNewAddress({
      fullName: "",
      phone: "",
      street: "",
      streetNumber: "",
      unitNumber: "",
      suburb: "",
      city: "",
      region: "",
      postalCode: "",
      landmark: "",
      addressType: "Home",
      isDefault: false,
      country: "New Zealand",
    });

    setAddressError("");
    setShowAddForm(false);
    fetchAddresses();
    
  } catch (err) {
    console.log(err);
    console.error("Error saving address:", err.response?.data || err.message);

    setAddressError(
      err.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};





  // ✅ Delete address
  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/address/delete/${id}`, {
        withCredentials: true,
      });
      setAddresses(addresses.filter((addr) => addr._id !== id));
      if (selectedAddress?._id === id) setSelectedAddress(null);
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  // ✅ Place order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }
    try {
      const orderRes = await axios.post(
        `${API_BASE_URL}/order/create`,
        {
          products: cart.map((item) => ({
            productId: item.id,
            quantity: item.qty,
          })),
          address: selectedAddress,
          totalPrice: total,
        },
        { withCredentials: true }
      );

      const order = orderRes.data.orderData;
     
      // const orderId = order._id;
      // const payRes = await axios.post(
      //   `${API_BASE_URL}/order/create-payment-intent`,
      //   { order: { orderId: order._id }, selectedPaymentMethod: "card" },
      //   { withCredentials: true }
      // );
      // navigate("/checkoutform", {
      //   state: {
      //     orderDetails: {
      //       orderId: order._id,
      //       amount: payRes.data.paymentIntent.amount,
      //       clientSecret: payRes.data.paymentIntent.client_secret,
      //       description: `Order #${order._id}`,
      //     },
      //   },
      // });

          navigate("/checkout-form", {
      state: {
        orderDetails: {
          amount: order.totalPrice * 100, // Stripe works in cents
          currency: "usd",
          orderId: order._id,
          description: "Test Order",
        },
      },
    });
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  //     setOrderDetails({
  //       orderId: order._id,
  //       amount: payRes.data.paymentIntent.amount,
  //       clientSecret: payRes.data.paymentIntent.client_secret,
  //       description: `Order #${order._id}`,
  //     });
  //   } catch (err) {
  //     console.error("Checkout error:", err);
  //   }
  // };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <style>
        {`
          @media (max-width: 768px) {
            .checkout-grid {
              display: block !important;
            }
            .checkout-card {
              margin-bottom: 20px !important;
            }
            .place-order-btn {
              width: 100% !important;
            }
          }
        `}
      </style>

      <Header />
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Checkout
      </h2>

      <div
        className="checkout-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Address Section */}
        <div
          className="checkout-card"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
              Shipping Address
            </h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                padding: "6px 12px",
                fontSize: "14px",
                background: "#16a34a",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showAddForm ? "Cancel" : "Add New"}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddAddress} style={{ marginBottom: "15px" }}>
              {[
                { key: "fullName", label: "Full Name" },
                { key: "phone", label: "Phone Number" },
                { key: "street", label: "Street" },
                { key: "streetNumber", label: "Street Number" },
                { key: "unitNumber", label: "Unit Number (optional)" },
                { key: "suburb", label: "Suburb" },
                { key: "city", label: "City" },
                { key: "region", label: "Region" },
                { key: "postalCode", label: "Postal Code" },
                { key: "landmark", label: "Landmark (optional)" },
              ].map((field) => (
                <input
                  key={field.key}
                  type="text"
                  placeholder={field.label}
                  value={newAddress[field.key]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field.key]: e.target.value })
                  }
                  required={
                    field.key !== "unitNumber" && field.key !== "landmark"
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}
                />
              ))}

              <select
                value={newAddress.addressType}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, addressType: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, isDefault: e.target.checked })
                  }
                />
                Set as Default Address
              </label>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save Address
              </button>
            {addressError && (
  <p style={{ color: "red", marginTop: "8px" }}>{addressError}</p>
)}

            </form>
          )}

          {addresses.length > 0 ? (
            <div>
              {addresses.map((addr) => (
                <label
                  key={addr._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    border: `1px solid ${
                      selectedAddress?._id === addr._id ? "#2563eb" : "#ccc"
                    }`,
                    borderRadius: "8px",
                    marginBottom: "10px",
                    background:
                      selectedAddress?._id === addr._id ? "#eff6ff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <input
                      type="radio"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                      style={{ marginRight: "10px" }}
                    />
                    <div>
                      <p style={{ fontWeight: "600" }}>{addr.fullName}</p>
                      <p style={{ fontSize: "14px", color: "#555" }}>
                        {addr.street} {addr.streetNumber},{" "}
                        {addr.unitNumber && `${addr.unitNumber}, `}
                        {addr.suburb}, {addr.city}, {addr.region} -{" "}
                        {addr.postalCode}
                      </p>
                      <p style={{ fontSize: "14px", color: "#777" }}>
                        {addr.phone} • {addr.addressType}
                        {addr.isDefault ? " • Default" : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(addr._id)}
                    style={{
                      fontSize: "14px",
                      color: "red",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </label>
              ))}
            </div>
          ) : (
            <p style={{ color: "#777" }}>No saved addresses. Please add one.</p>
          )}
        </div>

        {/* Order Summary */}
        <div
          className="checkout-card"
          style={{
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3
            style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}
          >
            Order Summary
          </h3>
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "8px 0",
                  color: "#444",
                }}
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            Total: ${total.toFixed(2)}
          </h4>
        </div>
      </div>

      {/* Place Order Button */}
      <div style={{ marginTop: "20px" }}>
        {!orderDetails ? (
          <button
            onClick={handlePlaceOrder}
            className="place-order-btn"
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Place Order & Continue to Payment
          </button>
        ) : (
          <div
            style={{
              marginTop: "20px",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CheckoutForm orderDetails={orderDetails} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
