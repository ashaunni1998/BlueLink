import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

const BusinessCardDetails = () => {
  const quantities = [
    { qty: 50, pricePerCard: 0.44, packPrice: 22.0 },
    { qty: 100, pricePerCard: 0.43, packPrice: 43.0, oldPrice: 44.0 },
    { qty: 200, pricePerCard: 0.37, packPrice: 74.0, oldPrice: 88.0 },
    { qty: 400, pricePerCard: 0.32, packPrice: 129.0, oldPrice: 176.0, recommended: true },
    { qty: 600, pricePerCard: 0.27, packPrice: 163.0, oldPrice: 264.0 },
    { qty: 800, pricePerCard: 0.27, packPrice: 217.0, oldPrice: 352.0 },
    { qty: 1000, pricePerCard: 0.25, packPrice: 250.0, oldPrice: 440.0 }
  ];

  const imageList = [
    '/assets/cards/card5.jpg',
    '/assets/cards/card2.jpg',
    '/assets/cards/card3.jpg',
    '/assets/cards/card4.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const [selectedSize, setSelectedSize] = useState("Standard");
  const [selectedFinish, setSelectedFinish] = useState("Matte");
  const [selectedCorner, setSelectedCorner] = useState("Square");

  return (
    <div style={{ fontFamily: 'sans-serif', width: '90%', margin: '0 auto' }}>
      <Header />

      <style>
        {`
          @media (max-width: 768px) {
            .details-container {
              flex-direction: column;
              padding: 16px;
            }
            .image-section, .content-section {
              padding: 0 !important;
              width: 100% !important;
              position: static !important;
              top: auto !important;
            }
            .quantity-table th, .quantity-table td {
              font-size: 13px;
              padding: 8px;
            }
               .content-section > div {
    overflow-x: hidden !important;
  }

  
          }
        `}
      </style>

      <div className="details-container" style={{
          display: 'flex',
    flexWrap: 'nowrap', // ensure horizontal layout
    padding: 20,
    gap: 20,
    height: '80vh', // give full height for scroll behavior
    overflow: 'hidden'
      }}>
        {/* Left Sticky Image Section */}
        <div
          className="image-section"
          style={{
            flex: 1,
            minWidth: 300,
            maxWidth: 500,
            position: 'sticky',
            top: 80,
            alignSelf: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            height: 'fit-content'
          }}
        >
          <img
            src={imageList[currentIndex]}
            alt={`Card ${currentIndex + 1}`}
            style={{
              width: '100%',
              maxHeight: 350,
              objectFit: 'cover',
              borderRadius: 10,
              transition: '0.3s ease-in-out'
            }}
          />

          <button onClick={goToPrev} style={{
            position: 'absolute',
            top: '45%',
            left: 10,
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)'
          }}>‹</button>

          <button onClick={goToNext} style={{
            position: 'absolute',
            top: '45%',
            right: 10,
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)'
          }}>›</button>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap'
          }}>
            {imageList.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumb ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 6,
                  cursor: 'pointer',
                  border: i === currentIndex ? '2px solid #00b388' : '1px solid #ccc',
                  boxShadow: i === currentIndex ? '0 0 5px rgba(0,179,136,0.4)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Scrollable Section */}
      <div
  className="content-section"
  style={{
    flex: 1.2,
    paddingLeft: 40,
    minWidth: 300,
    overflowY: 'auto',
    paddingRight: 16,
    height: '100%' // so it fills the height and can scroll inside
  }}
>

          <h2 style={{ fontSize: '26px', marginBottom: 10 }}>Original Business Cards</h2>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>16pt, great quality paper business cards online</p>
          <p style={{ marginBottom: 10 }}>
            <strong>50</strong> cards from <strong>$22.00</strong>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} color="#00b388" fill="#00b388" style={{ marginRight: 4 }} />
            ))}
            <span style={{ color: '#00b388', marginLeft: 8 }}>2916 reviews</span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Premium as standard</h3>
          <p style={{ fontSize: 14, lineHeight: '1.6', color: '#333' }}>
            Thicker than your average card, Original Business Cards set a new standard for “standard” business cards.
            With a smooth, uniform finish and excellent print quality, it’s the great value paper that FEELS great.
            Design and print your business cards online in Standard, Square and MOO Sizes.
          </p>
          <ul style={{ marginTop: 10, paddingLeft: 20, fontSize: 14 }}>
            <li>130lb weight, 16pt thickness</li>
            <li>Available in two free finishes</li>
          </ul>
          <p style={{ fontSize: 13, color: '#555', marginTop: 10 }}>
            Made from responsibly sourced FSC® certified material
          </p>

          <div style={{ marginTop: 30 }}>
            <h4 style={{ fontWeight: 600 }}>Choose your size</h4>
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
              {[
                { label: 'Standard', desc: '2.0″ x 3.5″' },
                { label: 'MOO', desc: '2.16″ x 3.3″' },
                { label: 'Square', desc: '2.56″ x 2.56″' }
              ].map((size) => (
                <div
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  style={{
                    border: selectedSize === size.label ? '2px solid #00b388' : '1px solid #ccc',
                    borderRadius: 6,
                    padding: 12,
                    cursor: 'pointer',
                    flex: 1,
                    minWidth: 120
                  }}
                >
                  <strong>{size.label}</strong><br />
                  <span style={{ fontSize: 12 }}>{size.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <h4 style={{ fontWeight: 600 }}>Choose your finish</h4>
            <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
              {[
                { label: 'Matte', desc: 'With a smooth feel. Shine-free so no glare.' },
                { label: 'Gloss', desc: 'Eye-catchingly shiny. Makes color photos pop.' }
              ].map((finish) => (
                <div
                  key={finish.label}
                  onClick={() => setSelectedFinish(finish.label)}
                  style={{
                    border: selectedFinish === finish.label ? '2px solid #00b388' : '1px solid #ccc',
                    borderRadius: 6,
                    padding: 12,
                    cursor: 'pointer',
                    flex: 1,
                    minWidth: 140
                  }}
                >
                  <strong>{finish.label}</strong><br />
                  <span style={{ fontSize: 12 }}>{finish.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <h4 style={{ fontWeight: 600 }}>Choose your corners</h4>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {[
                { label: 'Square', desc: 'Sharp and Stylish' },
                { label: 'Rounded', desc: 'Smooth & Rounded' }
              ].map((corner) => (
                <div
                  key={corner.label}
                  onClick={() => setSelectedCorner(corner.label)}
                  style={{
                    border: selectedCorner === corner.label ? '2px solid #00b388' : '1px solid #ccc',
                    padding: '10px 16px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  <strong>{corner.label}</strong><br />
                  <span style={{ fontSize: 12 }}>{corner.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <h4 style={{ fontWeight: 600 }}>Choose your quantity</h4>
            <table className="quantity-table" style={{ width: '100%', marginTop: 10, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: 14, color: '#555' }}>
                  <th>Quantity</th>
                  <th>Price per card</th>
                  <th>Pack price</th>
                </tr>
              </thead>
              <tbody>
                {quantities.map((q, index) => (
                  <tr key={index} style={{
                    background: q.recommended ? '#f6fdfb' : '#fff',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer'
                  }}>
                    <td style={{ padding: 10 }}>{q.qty}</td>
                    <td>${q.pricePerCard.toFixed(2)}</td>
                    <td>
                      ${q.packPrice.toFixed(2)}{' '}
                      {q.oldPrice && (
                        <span style={{
                          textDecoration: 'line-through',
                          color: '#999',
                          fontSize: 12,
                          marginLeft: 4
                        }}>
                          ${q.oldPrice.toFixed(2)}
                        </span>
                      )}
                      {q.recommended && (
                        <span style={{
                          background: '#d0f2ea',
                          color: '#00795c',
                          fontSize: 12,
                          padding: '2px 6px',
                          borderRadius: 4,
                          marginLeft: 6
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

          <div style={{ marginTop: 20, fontSize: 14, color: '#555' }}>
            <p><strong>Selected Size:</strong> {selectedSize}</p>
            <p><strong>Selected Finish:</strong> {selectedFinish}</p>
            <p><strong>Selected Corner:</strong> {selectedCorner}</p>
          </div>

          <div style={{ marginTop: 30 }}>
            <a href="/checkout">
              <button style={{
                background: '#00b388',
                color: '#fff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: 6,
                fontSize: 16,
                cursor: 'pointer',
                width: '100%',
                maxWidth: 300
              }}>
                Continue
              </button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessCardDetails;
