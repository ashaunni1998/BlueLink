import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const TShirtPrintingDetail = () => {
  const images = [
    '/assets/tshirt/main.jpg',
    '/assets/tshirt/side.jpg',
    '/assets/tshirt/back.jpg',
    '/assets/tshirt/folded.jpg'
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['White', 'Black', 'Blue', 'Red'];
  const pricePerShirt = 12.0;

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('White');
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (quantity * pricePerShirt).toFixed(2);

  return (
    <div style={{ fontFamily: 'sans-serif', width: '90%', margin: '0 auto' }}>
      <Header />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, marginTop: 40 }}>
        {/* Image Section */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ position: 'relative' }}>
            <img
              src={images[currentImage]}
              alt="T-Shirt"
              style={{ width: '100%', borderRadius: 10 }}
            />
            {/* Left Arrow */}
            <button
              onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}
              style={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: 30,
                height: 30,
                fontSize: 18,
                cursor: 'pointer'
              }}
            >
              ‹
            </button>
            {/* Right Arrow */}
            <button
              onClick={() => setCurrentImage((currentImage + 1) % images.length)}
              style={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: 30,
                height: 30,
                fontSize: 18,
                cursor: 'pointer'
              }}
            >
              ›
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setCurrentImage(i)}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 6,
                  border: i === currentImage ? '2px solid #00b388' : '1px solid #ccc',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div style={{ flex: 1.2, minWidth: 300 }}>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Custom Printed T-Shirts</h2>
          <p style={{ marginBottom: 16, color: '#555' }}>
            Premium quality cotton T-Shirts with your custom design. Great for events, branding, or gifts.
          </p>

          {/* Size Selection */}
          <h4>Size</h4>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {sizes.map(size => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: '6px 14px',
                  border: selectedSize === size ? '2px solid #00b388' : '1px solid #ccc',
                  borderRadius: 20,
                  cursor: 'pointer',
                  backgroundColor: selectedSize === size ? '#f6fdfb' : '#fff'
                }}
              >
                {size}
              </div>
            ))}
          </div>

          {/* Color Selection */}
          <h4>Color</h4>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {colors.map(color => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  padding: '6px 14px',
                  border: selectedColor === color ? '2px solid #00b388' : '1px solid #ccc',
                  borderRadius: 20,
                  cursor: 'pointer',
                  backgroundColor: selectedColor === color ? '#f6fdfb' : '#fff'
                }}
              >
                {color}
              </div>
            ))}
          </div>

          {/* Quantity Input */}
          <h4>Quantity</h4>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              width: 100,
              marginBottom: 20
            }}
          />

          {/* Pricing */}
          <h3>
            Total: ${totalPrice}{' '}
            <span style={{ fontSize: 14, color: '#888' }}>
              (${pricePerShirt.toFixed(2)} each)
            </span>
          </h3>

          {/* Add to Cart */}
          <button
            style={{
              marginTop: 20,
              padding: '12px 24px',
              background: '#00b388',
              color: '#fff',
              fontSize: 16,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Add to cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TShirtPrintingDetail;
