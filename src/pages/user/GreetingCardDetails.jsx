import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Star } from 'lucide-react';

const GreetingCardDetails = () => {
  const imageList = [
    '/assets/Stationery/image1.jpg',
    '/assets/Stationery/image2.jpg',
    '/assets/Stationery/image3.jpg',
    '/assets/Stationery/image4.jpg',
    '/assets/Stationery/image5.jpg'
  ];

  const colors = ['Gold', 'Kraft', 'Red', 'Silver', 'White', 'White Luxe'];
  const [selectedColor, setSelectedColor] = useState('Gold');

  const quantities = [
    { qty: 25, pricePerCard: 0.32, packPrice: 8.0 },
    { qty: 50, pricePerCard: 0.32, packPrice: 16.0 },
    { qty: 75, pricePerCard: 0.32, packPrice: 24.0 },
    { qty: 100, pricePerCard: 0.32, packPrice: 32.0, recommended: true },
    { qty: 125, pricePerCard: 0.32, packPrice: 40.0 },
    { qty: 150, pricePerCard: 0.32, packPrice: 48.0 },
    { qty: 175, pricePerCard: 0.32, packPrice: 56.0 }
  ];

  const [selectedQty, setSelectedQty] = useState(25);
  const [currentImage, setCurrentImage] = useState(0);

  const selectedPack = quantities.find(q => q.qty === selectedQty);


  const goToPrev = () => {
  setCurrentImage((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
};

const goToNext = () => {
  setCurrentImage((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
};


  return (
    <div style={{ fontFamily: 'sans-serif', width: '90%', margin: '0 auto' }}>
      <Header />

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30, gap: 30 }}>
        {/* Left Image & Thumbnails */}
        <div style={{ flex: 1, minWidth: 300 }}>
        <div style={{ position: 'relative' }}>
  <img
    src={imageList[currentImage]}
    alt="Greeting Card"
    style={{ width: '100%', borderRadius: 10 }}
  />

  {/* Left arrow */}
  <button
    onClick={goToPrev}
    style={{
      position: 'absolute',
      top: '50%',
      left: 10,
      transform: 'translateY(-50%)',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '50%',
      width: 32,
      height: 32,
      fontSize: 18,
      cursor: 'pointer',
      boxShadow: '0 0 6px rgba(0,0,0,0.2)'
    }}
  >
    ‹
  </button>

  {/* Right arrow */}
  <button
    onClick={goToNext}
    style={{
      position: 'absolute',
      top: '50%',
      right: 10,
      transform: 'translateY(-50%)',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '50%',
      width: 32,
      height: 32,
      fontSize: 18,
      cursor: 'pointer',
      boxShadow: '0 0 6px rgba(0,0,0,0.2)'
    }}
  >
    ›
  </button>
</div>

          <div style={{ display: 'flex', marginTop: 10, gap: 10, flexWrap: 'wrap' }}>
            {imageList.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumb ${i}`}
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
          <h2 style={{ fontSize: 24, marginBottom: 4 }}>Small Envelopes</h2>
          <p style={{ color: '#666' }}>6.10” x 4.33” – Made from premium paper</p>
          <p><strong>25 Envelopes</strong> from <strong>$8.00</strong></p>

          {/* Reviews */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} color="#00b388" fill="#00b388" style={{ marginRight: 4 }} />
            ))}
            <span style={{ color: '#00b388', marginLeft: 8 }}>275 reviews</span>
          </div>

          {/* Description */}
          <p style={{ marginBottom: 10 }}>
            Made with premium paper.<br />
            Choose from red, gold, silver, white and White Luxe.<br />
            Perfect for Standard Postcards, Invitations, Flyers or Greeting Cards.
          </p>

          {/* Color Picker */}
          <div>
            <h4>Choose your color</h4>
            <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: '8px 12px',
                    border: selectedColor === color ? '2px solid #00b388' : '1px solid #ccc',
                    borderRadius: 4,
                    cursor: 'pointer',
                    background: selectedColor === color ? '#f6fdfb' : '#fff'
                  }}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Table */}
          <div style={{ marginTop: 30 }}>
            <h4>Choose your quantity</h4>
            <table style={{ width: '100%', marginTop: 10, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#555' }}>
                  <th>Quantity</th>
                  <th>Price per card</th>
                  <th>Pack price</th>
                </tr>
              </thead>
              <tbody>
                {quantities.map((q, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedQty(q.qty)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedQty === q.qty ? '#e6fff8' : '#fff',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    <td style={{ padding: 10 }}>{q.qty}</td>
                    <td>${q.pricePerCard.toFixed(2)}</td>
                    <td>
                      ${q.packPrice.toFixed(2)}
                      {q.recommended && (
                        <span style={{
                          background: '#d0f2ea',
                          color: '#00795c',
                          fontSize: 12,
                          padding: '2px 6px',
                          borderRadius: 4,
                          marginLeft: 8
                        }}>
                          RECOMMENDED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div style={{ marginTop: 30, borderTop: '1px solid #ccc', paddingTop: 16 }}>
            <h4>Summary</h4>
            <p><strong>Size:</strong> Small</p>
            <p><strong>Color:</strong> {selectedColor}</p>
            <p><strong>Envelope flap:</strong> Diamond</p>
            <p><strong>Quantity:</strong> {selectedQty}</p>
            <p><strong>Price:</strong> ${selectedPack.packPrice.toFixed(2)}</p>
          </div>

          <button style={{
            marginTop: 20,
            padding: '12px 24px',
            background: '#00b388',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            cursor: 'pointer'
          }}>
            Add to cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GreetingCardDetails;
