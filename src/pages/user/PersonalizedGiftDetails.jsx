import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

const PersonalizedGiftDetails = () => {
  const giftOptions = [
    { qty: 1, pricePerItem: 15.0, packPrice: 15.0 },
    { qty: 5, pricePerItem: 13.5, packPrice: 67.5 },
    { qty: 10, pricePerItem: 12.0, packPrice: 120.0 },
  ];

  const imagePreviews = [
    "/assets/gifts/custom-mug.jpg",
    "/assets/gifts/custom-mug2.jpg",
    "/assets/gifts/custom-mug3.jpg",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handlePrev = () => {
    if (mainImageIndex > 0) setMainImageIndex(mainImageIndex - 1);
  };

  const handleNext = () => {
    if (mainImageIndex < imagePreviews.length - 1) setMainImageIndex(mainImageIndex + 1);
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <div style={{ width: '90%', margin: '0 auto' }}>
        <Header />

        {/* Product Info Section */}
        <div style={{ display: 'flex', marginTop: '40px', flexWrap: 'wrap', gap: '40px' }}>
          {/* Left: Product Image and Previews */}
          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              {/* Main Image */}
              <img
                src={imagePreviews[mainImageIndex]}
                alt="Personalized Gift"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }}
              />

              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={mainImageIndex === 0}
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '-15px',
                  fontSize: '24px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  cursor: mainImageIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: mainImageIndex === 0 ? 0.4 : 1,
                }}
              >
                ‹
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={mainImageIndex === imagePreviews.length - 1}
                style={{
                  position: 'absolute',
                  top: '45%',
                  right: '-15px',
                  fontSize: '24px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  cursor: mainImageIndex === imagePreviews.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: mainImageIndex === imagePreviews.length - 1 ? 0.4 : 1,
                }}
              >
                ›
              </button>
            </div>

            {/* Preview Thumbnails */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {imagePreviews.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Preview ${i + 1}`}
                  onClick={() => setMainImageIndex(i)}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: mainImageIndex === i ? '2px solid #000' : '1px solid #ccc',
                    padding: '2px',
                    boxSizing: 'border-box',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Custom Mug with Name</h2>
            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
              Add a personal touch with names, photos, or messages. Perfect for birthdays, anniversaries, or just because!
            </p>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} color="#FFD700" fill="#FFD700" />
              ))}
              <span style={{ marginLeft: '8px', color: '#777' }}>(200+ reviews)</span>
            </div>

            {/* Quantity Options */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px' }}>Select Quantity:</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {giftOptions.map((opt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    style={{
                      padding: '10px 15px',
                      borderRadius: '8px',
                      border: selectedIndex === index ? '2px solid #000' : '1px solid #ccc',
                      background: selectedIndex === index ? '#f0f0f0' : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {opt.qty} {opt.qty > 1 ? 'pcs' : 'pc'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Info */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '16px' }}>
                <strong>Price per item:</strong> ${giftOptions[selectedIndex].pricePerItem.toFixed(2)}
              </p>
              <p style={{ fontSize: '16px' }}>
                <strong>Total:</strong> ${giftOptions[selectedIndex].packPrice.toFixed(2)}
              </p>
            </div>

            <button
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Description Section */}
        <section style={{ marginTop: '60px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>Product Description</h3>
          <p style={{ fontSize: '16px', color: '#555' }}>
            This personalized ceramic mug is a wonderful gift for your loved ones. Whether it’s a funny quote,
            a heartfelt message, or a custom design, this mug brings joy to everyday coffee routines.
            <br /><br />
            Microwave and dishwasher safe. 11 oz. capacity.
          </p>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default PersonalizedGiftDetails;
