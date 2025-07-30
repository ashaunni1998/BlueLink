import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const StickerDetails = () => {
  const images = [
    '/assets/Stationery/main.jpg',
    '/assets/Stationery/thumb1.jpg',
    '/assets/Stationery/thumb2.jpg',
    '/assets/Stationery/thumb3.jpg',
  ];

  const colors = ['Gold', 'Silver'];
  const shapes = ['Round', 'Rectangular'];
  const sizes = ['1" x 1"', '1.5" x 1.5"', '2" x 2"', '3" x 3"', '4" x 4"'];
  const format = 'Sheet';

  const quantities = [
    { label: '24 items', value: 24, pricePerItem: 0.85 },
    { label: '48 items', value: 48, pricePerItem: 0.80 },
    { label: '72 items', value: 72, pricePerItem: 0.78 },
    { label: '100 items', value: 100, pricePerItem: 0.75 },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Gold');
  const [selectedShape, setSelectedShape] = useState('Round');
  const [selectedSize, setSelectedSize] = useState('1" x 1"');
  const [selectedQty, setSelectedQty] = useState(quantities[0]);

  const totalPrice = (selectedQty.value * selectedQty.pricePerItem).toFixed(2);

  return (
    <div style={{ fontFamily: 'sans-serif', width: '90%', margin: '0 auto' }}>
      <Header />

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30, gap: 30 }}>
        {/* Left Image Gallery */}
        <div style={{ flex: 1, minWidth: 300 }}>
         <div style={{ position: 'relative' }}>
  <img
    src={images[currentImage]}
    alt="Sticker"
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
      background: 'rgba(255, 255, 255, 0.8)',
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
      background: 'rgba(255, 255, 255, 0.8)',
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
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
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

        {/* Right Panel */}
        <div style={{ flex: 1.2, minWidth: 300 }}>
          <h2 style={{ fontSize: 24, marginBottom: 4 }}>Metallic Stickers</h2>
          <p style={{ color: '#00b388', fontWeight: 600, marginBottom: 8 }}>New</p>
          <p style={{ marginBottom: 16 }}>
            Just the right amount of shine with a smooth matte finish. Meet our luxuriously understated Metallic Stickers – 
            they bring a hint of glam to everything they touch. Irresistibly eye-catching, tearable, and perfect for packages.
          </p>

          {/* Color */}
          <h4>Color</h4>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {colors.map((color) => (
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

          {/* Shape */}
          <h4>Shape</h4>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {shapes.map((shape) => (
              <div
                key={shape}
                onClick={() => setSelectedShape(shape)}
                style={{
                  padding: '6px 14px',
                  border: selectedShape === shape ? '2px solid #00b388' : '1px solid #ccc',
                  borderRadius: 20,
                  cursor: 'pointer',
                  backgroundColor: selectedShape === shape ? '#f6fdfb' : '#fff'
                }}
              >
                {shape}
              </div>
            ))}
          </div>

          {/* Size */}
          <h4>Size</h4>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {sizes.map((size) => (
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

          {/* Format */}
          <h4>Format</h4>
          <div style={{
            padding: '6px 14px',
            border: '2px solid #00b388',
            borderRadius: 20,
            display: 'inline-block',
            backgroundColor: '#f6fdfb',
            marginBottom: 20
          }}>
            {format}
          </div>

          {/* Quantity Dropdown */}
          <h4>Quantity</h4>
          <select
            onChange={(e) => {
              const q = quantities.find(qty => qty.value === parseInt(e.target.value));
              if (q) setSelectedQty(q);
            }}
            value={selectedQty.value}
            style={{
              padding: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: 250,
              marginBottom: 20
            }}
          >
            {quantities.map((q, i) => (
              <option key={i} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>

          {/* Price */}
          <h3 style={{ marginBottom: 20 }}>
            Total price: ${totalPrice}{' '}
            <span style={{ fontSize: 14, color: '#888' }}>
              (${selectedQty.pricePerItem.toFixed(2)} per item)
            </span>
          </h3>

          {/* Buttons */}
          <button style={{
            background: '#00b388',
            color: '#fff',
            padding: '12px 24px',
            fontSize: 16,
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            marginBottom: 16
          }}>
            Start customizing
          </button>

          {/* <div style={{
            border: '1px solid #ddd',
            padding: 16,
            borderRadius: 6,
            marginBottom: 20
          }}> */}
            {/* <p style={{ marginBottom: 8 }}>
              <strong>Design the perfect fit</strong> with our Metallic Stickers design guides
            </p>
            <button style={{
              border: '1px solid #00b388',
              color: '#00b388',
              background: 'transparent',
              padding: '8px 16px',
              borderRadius: 4,
              cursor: 'pointer'
            }}>
              Download design guides
            </button>
          </div> */}

          <div style={{ background: '#f0f8f5', padding: 16, borderRadius: 6 }}>
            <p style={{ marginBottom: 8 }}>
              <strong>Not sure where to start?</strong> <a href="#" style={{ color: '#00b388' }}>Let's chat</a>
            </p>
            <p style={{ fontSize: 14 }}>
              Looking for higher quantity orders or a unique shape? Our experts would love to help.
              <br />
              Email <a href="mailto:inquiries@moo.com">bluelink@gmail.com</a> or call <strong>1-401-484-0988</strong>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StickerDetails;
