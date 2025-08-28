import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import API_BASE_URL from "../config"; // check correct path

const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY");

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const [orderSummary, setOrderSummary] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

    // load cart from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setOrderSummary(cartData);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyCoupon = async () => {
    if (!coupon) return;

    // 🔹 Example: validate coupon locally (replace with API call if needed)
    if (coupon === "SAVE10") {
      setDiscount(10); // 10% discount
      setAppliedCoupon("SAVE10");
    } else {
      alert("Invalid coupon");
      setDiscount(0);
      setAppliedCoupon(null);
    }

    // If you want backend validation instead:
    // const res = await fetch(`${API_BASE_URL}/coupon/validate`, { method: "POST", ... });
    // const data = await res.json();
    // setDiscount(data.discountPercentage);
  };

  const calculateSubtotal = () =>
    orderSummary?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (discount > 0) {
      return subtotal - (subtotal * discount) / 100;
    }
    return subtotal;
  };

  const handleCheckout = async () => {
    try {
      // 1️⃣ Create Order in backend
      const orderRes = await fetch(`${API_BASE_URL}/order/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          products: orderSummary,
          shippingAddress: formData,
          coupon: appliedCoupon,
        }),
      });

      const orderData = await orderRes.json();
      if (orderRes.status !== 200) throw new Error(orderData.message);

      const orderId = orderData.orderData._id;

      // 2️⃣ Create Payment Intent
      const paymentRes = await fetch(
        `${API_BASE_URL}/order/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            order: { orderId },
            selectedPaymentMethod: "card",
          }),
        }
      );

      const paymentData = await paymentRes.json();
      if (paymentRes.status !== 200) throw new Error(paymentData.message);

      // 3️⃣ Confirm Payment
      const stripe = await stripePromise;
      const { client_secret } = paymentData.paymentIntent;

      const { error } = await stripe.confirmCardPayment(client_secret);
      if (error) {
        alert(error.message);
      } else {
        alert("✅ Payment Successful!");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <Header />

        <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "30px", textAlign: "center" }}>
            Checkout
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "40px",
            }}
          >
            {/* Billing Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
              style={{
                flex: 1,
                minWidth: "300px",
                background: "#f9f9f9",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                Billing Information
              </h3>

              {["fullName", "email", "phone", "address", "city", "postalCode", "country"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                )
              )}

              <button
                type="submit"
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Complete Order
              </button>
            </form>

            {/* Order Summary */}
            <div
              style={{
                flex: 1,
                minWidth: "300px",
                background: "#ffffff",
                padding: "30px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
                Order Summary
              </h3>

              {orderSummary && orderSummary.length > 0 ? (
                <>
                  {orderSummary.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "20px",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                      }}
                    >
                      <p style={{ fontWeight: "bold" }}>{item.name}</p>
                      <p style={{ margin: "5px 0" }}>Qty: {item.quantity}</p>
                      <p style={{ margin: "5px 0" }}>Price: ₹{item.price}</p>
                    </div>
                  ))}

                  <p>Subtotal: ₹{calculateSubtotal()}</p>

                  {discount > 0 && (
                    <p style={{ color: "green" }}>
                      Discount ({discount}%): -₹
                      {(calculateSubtotal() * discount) / 100}
                    </p>
                  )}

                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginTop: "10px",
                    }}
                  >
                    Total: ₹{calculateTotal()}
                  </p>

                  {/* Coupon Field */}
                  <div style={{ marginTop: "20px" }}>
                    <input
                      type="text"
                      placeholder="Enter Coupon"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        width: "70%",
                      }}
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      style={{
                        marginLeft: "10px",
                        padding: "10px 15px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </>
              ) : (
                <p>No items in cart</p>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

export default Checkout;
