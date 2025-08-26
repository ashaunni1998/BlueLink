import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from 'lucide-react';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");
  const [selectedCorner, setSelectedCorner] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching product with ID:", id);

        // Try different endpoints
        const endpoints = [
          `https://kerala-digital-park-server.vercel.app/api/products/${id}`,
          `https://kerala-digital-park-server.vercel.app/api/product/${id}`,
          `https://kerala-digital-park-server.vercel.app/api/productDetail/${id}`,
          `https://kerala-digital-park-server.vercel.app/api/getProduct/${id}`,
          `https://kerala-digital-park-server.vercel.app/api/productDetails/${id}`
        ];

        let res;
        let lastError;
        let workingEndpoint;

        for (const endpoint of endpoints) {
          try {
            console.log("🔍 Trying endpoint:", endpoint);
            res = await fetch(endpoint, {
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });

            if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
              workingEndpoint = endpoint;
              break;
            } else {
              lastError = `HTTP ${res.status} - ${endpoint}`;
            }
          } catch (err) {
            lastError = err.message;
          }
        }

        if (!res || !res.ok || !workingEndpoint) {
          // fallback: fetch list
          const listRes = await fetch('https://kerala-digital-park-server.vercel.app/api/products');
          if (listRes.ok) {
            const listData = await listRes.json();
            const products = listData.productData || listData.data || listData.products || listData;
            if (Array.isArray(products)) {
              const foundProduct = products.find(p => (p._id === id) || (p.id === id));
              if (foundProduct) {
                setProduct(foundProduct);
                if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0].label);
                if (foundProduct.finishes?.length) setSelectedFinish(foundProduct.finishes[0].label);
                if (foundProduct.corners?.length) setSelectedCorner(foundProduct.corners[0].label);
                return;
              } else {
                setError(`Product ID "${id}" not found.`);
                return;
              }
            }
          }
          throw new Error(`All methods failed. Last error: ${lastError}`);
        }

        const data = await res.json();
        const productData = data.data || data;
        setProduct(productData);
        if (productData.sizes?.length) setSelectedSize(productData.sizes[0].label);
        if (productData.finishes?.length) setSelectedFinish(productData.finishes[0].label);
        if (productData.corners?.length) setSelectedCorner(productData.corners[0].label);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
    else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  // image navigation
  const goToPrev = () => {
    setCurrentIndex(prev => (prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex(prev => (prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1));
  };

  // ✅ fixed: Add to cart using cookies (no localStorage token)
  const handleAddToCart = async () => {
    try {
      if (!product?._id) {
        alert("Product not loaded yet.");
        return;
      }

      const res = await fetch("https://kerala-digital-park-server.vercel.app/api/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 send login cookie
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          size: selectedSize,
          finish: selectedFinish,
          corner: selectedCorner
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Product added to cart!");
        window.location.href = "/cart";
      } else if (res.status === 401) {
        alert("⚠️ Session expired. Please login again.");
        window.location.href = "/signin";
      } else {
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  // reviews
  const handleSubmitReview = () => {
    if (!reviewText.trim() || !rating) {
      alert("Please give rating and write review.");
      return;
    }
    console.log("Submitting review:", { rating, reviewText });
    setReviewText('');
    setRating(0);
    alert("Review submitted!");
  };

  // ---- STYLES ----
  const styles = {
    container: { backgroundColor: "#f8f9fa", minHeight: "100vh" },
    imageSection: {
      flex: 1,
      maxWidth: window.innerWidth < 768 ? '100%' : '500px',
      position: window.innerWidth < 768 ? 'relative' : 'sticky',
      top: window.innerWidth < 768 ? 'auto' : '100px',
      height: 'fit-content'
    },
    detailsSection: {
      flex: 1.2,
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: window.innerWidth < 768 ? '20px' : '30px'
    },
    reviewsSection: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: window.innerWidth < 768 ? '20px' : '40px',
      backgroundColor: 'white',
      borderRadius: '12px',
      marginBottom: '40px'
    },
    thumbnailContainer: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px',
      overflowX: window.innerWidth < 768 ? 'auto' : 'visible',
      padding: window.innerWidth < 768 ? '0 0 10px 0' : '0'
    },
    thumbnail: {
      width: '60px',
      height: '60px',
      cursor: 'pointer',
      borderRadius: '8px',
      objectFit: 'cover',
      flexShrink: 0
    },
    button: {
      width: '100%',
      padding: '15px',
      background: '#2563EB',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '20px'
    },
    backButton: {
      padding: "10px 20px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px"
    }
  };

  // loading
  if (loading) return <p style={{ textAlign: "center", padding: "40px" }}>Loading product...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red", padding: "40px" }}>{error}</p>;
  if (!product) return <p style={{ textAlign: "center", padding: "40px" }}>Product not found.</p>;

  return (
    <div style={styles.container}>
      <div className="responsive-container">
        <Header />

        {/* Main */}
        <div style={{
          display: 'flex',
          gap: window.innerWidth < 768 ? '20px' : '40px',
          padding: window.innerWidth < 768 ? '20px' : '40px',
          maxWidth: '1200px',
          margin: '0 auto',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row'
        }}>
          {/* Images */}
          <div style={styles.imageSection}>
            {product.images?.length > 0 ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={typeof product.images[currentIndex] === 'string' ? product.images[currentIndex] : product.images[currentIndex]?.url || ''}
                  alt={product.name}
                  style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
                />
                {product.images.length > 1 && (
                  <>
                    <button onClick={goToPrev} style={{ position: 'absolute', left: '15px', top: '50%' }}>‹</button>
                    <button onClick={goToNext} style={{ position: 'absolute', right: '15px', top: '50%' }}>›</button>
                  </>
                )}
                <div style={styles.thumbnailContainer}>
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={typeof img === 'string' ? img : img?.url || ''}
                      onClick={() => setCurrentIndex(i)}
                      style={{
                        ...styles.thumbnail,
                        border: i === currentIndex ? '2px solid #00b388' : '2px solid transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : <div>No Image</div>}
          </div>

          {/* Details */}
          <div style={styles.detailsSection}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <button onClick={handleAddToCart} style={styles.button}>🛒 Add to Cart</button>
            <button onClick={() => navigate(`/editor/${product._id}`)} style={styles.button}>
              🎨 Customize / Upload Your Design
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div style={styles.reviewsSection}>
          <h3>Leave a Review</h3>
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={24} onClick={() => setRating(s)}
              fill={rating >= s ? '#facc15' : 'none'} stroke="#facc15" style={{ cursor: 'pointer' }} />
          ))}
          <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Write review..."/>
          <button onClick={handleSubmitReview}>Submit Review</button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
