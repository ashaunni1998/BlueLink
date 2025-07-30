import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

const PostcardDetails = () => {
  const quantities = [
    { qty: 25, pricePerCard: 0.80, packPrice: 20.0 },
    { qty: 50, pricePerCard: 0.75, packPrice: 37.5, oldPrice: 40.0 },
    { qty: 100, pricePerCard: 0.70, packPrice: 70.0, oldPrice: 80.0 },
    { qty: 200, pricePerCard: 0.65, packPrice: 130.0, oldPrice: 160.0, recommended: true },
    { qty: 500, pricePerCard: 0.60, packPrice: 300.0, oldPrice: 400.0 }
  ];

  const imageList = [
    '/assets/postcards/Template1.jpg',
    '/assets/postcards/Template2.jpg',
    '/assets/postcards/Template3.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

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
            }
            .quantity-table th, .quantity-table td {
              font-size: 13px;
              padding: 8px;
            }
          }
        `}
      </style>

      <div className="details-container" style={{ display: 'flex', flexWrap: 'wrap', padding: 20, gap: 20 }}>
        {/* Left Image Section */}
        <div className="image-section" style={{ flex: 1, minWidth: 300, position: 'relative' }}>
          <img
            src={imageList[currentIndex]}
            alt={`Postcards ${currentIndex + 1}`}
            style={{
              width: '100%',
              borderRadius: 10,
              transition: '0.3s ease-in-out',
              marginBottom: 10
            }}
          />
          <button onClick={goToPrev} style={{
            position: 'absolute', top: '45%', left: 10, transform: 'translateY(-50%)',
            background: '#fff', border: '1px solid #ccc', borderRadius: '50%',
            width: 32, height: 32, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 5px rgba(0,0,0,0.2)'
          }}>‹</button>
          <button onClick={goToNext} style={{
            position: 'absolute', top: '45%', right: 10, transform: 'translateY(-50%)',
            background: '#fff', border: '1px solid #ccc', borderRadius: '50%',
            width: 32, height: 32, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 5px rgba(0,0,0,0.2)'
          }}>›</button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {imageList.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumb ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: 60, height: 60, objectFit: 'cover', borderRadius: 6, cursor: 'pointer',
                  border: i === currentIndex ? '2px solid #00b388' : '1px solid #ccc',
                  boxShadow: i === currentIndex ? '0 0 5px rgba(0,179,136,0.4)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Content Section */}
        <div className="content-section" style={{ flex: 1.2, paddingLeft: 40, minWidth: 300 }}>
          <h2 style={{ fontSize: '26px', marginBottom: 10 }}>Personalized Postcards</h2>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>Glossy, full-color postcards for any occasion</p>
          <p style={{ marginBottom: 10 }}>
            <strong>25</strong> cards from <strong>$20.00</strong>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} color="#00b388" fill="#00b388" style={{ marginRight: 4 }} />
            ))}
            <span style={{ color: '#00b388', marginLeft: 8 }}>1240 reviews</span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Send a message that sticks</h3>
          <p style={{ fontSize: 14, lineHeight: '1.6', color: '#333' }}>
            Whether you're promoting a business, announcing an event, or just saying hello,
            custom postcards are a vibrant and effective way to connect. Choose from multiple sizes and finishes.
          </p>
          <ul style={{ marginTop: 10, paddingLeft: 20, fontSize: 14 }}>
            <li>Premium 14pt glossy cardstock</li>
            <li>Full-color, double-sided printing</li>
            <li>Standard 4"x6" size</li>
          </ul>
          <p style={{ fontSize: 13, color: '#555', marginTop: 10 }}>
            Eco-friendly materials. Made with FSC® certified paper.
          </p>

          {/* Quantity Table */}
          <div style={{ marginTop: 30 }}>
            <h4 style={{ fontWeight: 600 }}>Choose your quantity</h4>
            <table className="quantity-table" style={{ width: '100%', marginTop: 10, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: 14, color: '#555' }}>
                  <th>Quantity</th>
                  <th>Price per postcard</th>
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

          {/* Continue Button */}
          <div style={{ marginTop: 30 }}>
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostcardDetails;
