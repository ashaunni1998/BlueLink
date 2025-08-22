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
  
  // UI state from BusinessCardDetails
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
        
        // Try different endpoint variations
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
        
        // Try each endpoint until one works
        for (const endpoint of endpoints) {
          try {
            console.log("🔍 Trying endpoint:", endpoint);
            res = await fetch(endpoint, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            
            console.log(`📊 ${endpoint} - Status: ${res.status}, Content-Type: ${res.headers.get('content-type')}`);
            
            if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
              console.log("✅ Success with endpoint:", endpoint);
              workingEndpoint = endpoint;
              break;
            } else {
              lastError = `HTTP ${res.status} - ${endpoint}`;
            }
          } catch (err) {
            console.log(`❌ Error with ${endpoint}:`, err.message);
            lastError = err.message;
          }
        }
        
        if (!res || !res.ok || !workingEndpoint) {
          // Fallback: fetch all products and filter
          console.log("🔍 Individual product endpoints failed. Fetching products list and filtering...");
          try {
            const listRes = await fetch('https://kerala-digital-park-server.vercel.app/api/products');
            if (listRes.ok) {
              const listData = await listRes.json();
              console.log("📋 Fetched products list:", listData);
              
              const products = listData.productData || listData.data || listData.products || listData;
              
              if (Array.isArray(products)) {
                console.log("📝 Available product IDs:");
                products.forEach((product, index) => {
                  const productId = product._id || product.id || 'NO_ID';
                  console.log(`  ${index + 1}. ${product.name || 'Unnamed'} - ID: ${productId}`);
                });
                
                const foundProduct = products.find(product => 
                  (product._id === id) || (product.id === id)
                );
                
                if (foundProduct) {
                  console.log("✅ Found product in list:", foundProduct);
                  setProduct(foundProduct);
                  
                  // Set defaults based on product data
                  if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0].label);
                  if (foundProduct.finishes?.length) setSelectedFinish(foundProduct.finishes[0].label);
                  if (foundProduct.corners?.length) setSelectedCorner(foundProduct.corners[0].label);
                  
                  return;
                } else {
                  setError(`Product ID "${id}" not found. Available products: ${products.map(p => `"${p.name}" (ID: ${p._id || p.id})`).join(', ')}`);
                  return;
                }
              }
            }
          } catch (err) {
            console.log("❌ Could not fetch products list:", err);
          }
          
          throw new Error(`All methods failed. Last error: ${lastError}`);
        }
        
        const data = await res.json();
        console.log("API Response:", data);
        
        if (data.success || data.data) {
          const productData = data.data || data;
          setProduct(productData);
          
          // Set defaults
          if (productData.sizes?.length) setSelectedSize(productData.sizes[0].label);
          if (productData.finishes?.length) setSelectedFinish(productData.finishes[0].label);
          if (productData.corners?.length) setSelectedCorner(productData.corners[0].label);
        } else {
          throw new Error(data.message || 'Product not found');
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  // Image navigation functions
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? (product?.images?.length || 1) - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === (product?.images?.length || 1) - 1 ? 0 : prev + 1));
  };

  // Add to cart functionality
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to your cart.");
        return;
      }
      if (!product?._id) {
        alert("Product not loaded yet.");
        return;
      }

      const res = await fetch(`https://kerala-digital-park-server.vercel.app/api/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          size: selectedSize,
          finish: selectedFinish,
          corner: selectedCorner
        }),
        credentials: "include"
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product added to cart!");
        window.location.href = "/cart";
      } else {
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Review submission
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

  const styles = {
    container: {
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    },
    mainContent: {
      display: 'flex',
      gap: '40px',
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row'
    },
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

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        padding: window.innerWidth < 768 ? "20px" : "40px", 
        textAlign: "center",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px"
      }}>
        <div>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #00b388",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          Loading product details...
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>Product ID: {id}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        padding: window.innerWidth < 768 ? "20px" : "40px", 
        textAlign: "center",
        color: "#dc3545",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div>
          <h2 style={{ color: "#dc3545", marginBottom: "20px", fontSize: window.innerWidth < 768 ? "20px" : "24px" }}>Error Loading Product</h2>
          <p style={{ marginBottom: "10px", fontSize: window.innerWidth < 768 ? "14px" : "16px" }}>{error}</p>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
            Attempted to fetch product with ID: {id}
          </p>
          <button 
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div style={{ 
        padding: window.innerWidth < 768 ? "20px" : "40px", 
        textAlign: "center",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div>
          <h2 style={{ fontSize: window.innerWidth < 768 ? "20px" : "24px" }}>Product Not Found</h2>
          <p style={{ marginBottom: "20px", fontSize: window.innerWidth < 768 ? "14px" : "16px" }}>
            The product with ID "{id}" could not be found.
          </p>
          <button 
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // Main product display
  return (
    <div style={styles.container}>
      <div className="responsive-container">
        <Header/>
        
        {/* Main content with responsive layout */}
        <div style={{
          display: 'flex',
          gap: window.innerWidth < 768 ? '20px' : '40px',
          padding: window.innerWidth < 768 ? '20px' : '40px',
          maxWidth: '1200px',
          margin: '0 auto',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row'
        }}>
          {/* Left: Images */}
          <div style={styles.imageSection}>
            {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={typeof product.images[currentIndex] === 'string' ? product.images[currentIndex] : product.images[currentIndex]?.url || ''}
                  alt={`${product.name} ${currentIndex + 1}`}
                  style={{ 
                    width: '100%', 
                    borderRadius: '12px', 
                    objectFit: 'cover',
                    maxHeight: window.innerWidth < 768 ? '300px' : '400px',
                    backgroundColor: '#f8f9fa'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={goToPrev} 
                      style={{ 
                        position: 'absolute', 
                        left: '15px', 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: window.innerWidth < 768 ? '35px' : '40px',
                        height: window.innerWidth < 768 ? '35px' : '40px',
                        cursor: 'pointer',
                        fontSize: window.innerWidth < 768 ? '16px' : '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ‹
                    </button>
                    <button 
                      onClick={goToNext} 
                      style={{ 
                        position: 'absolute', 
                        right: '15px', 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: window.innerWidth < 768 ? '35px' : '40px',
                        height: window.innerWidth < 768 ? '35px' : '40px',
                        cursor: 'pointer',
                        fontSize: window.innerWidth < 768 ? '16px' : '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ›
                    </button>
                  </>
                )}
                
                {product.images.length > 1 && (
                  <div style={styles.thumbnailContainer}>
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={typeof img === 'string' ? img : img?.url || ''}
                        onClick={() => setCurrentIndex(i)}
                        style={{
                          ...styles.thumbnail,
                          border: i === currentIndex ? '2px solid #00b388' : '2px solid transparent',
                          opacity: i === currentIndex ? 1 : 0.7
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                width: '100%',
                height: window.innerWidth < 768 ? '250px' : '400px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6c757d',
                fontSize: '16px'
              }}>
                No Image Available
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div style={styles.detailsSection}>
            <h1 style={{ 
              color: "#333", 
              marginBottom: "10px",
              fontSize: window.innerWidth < 768 ? "22px" : "28px",
              fontWeight: "bold",
              lineHeight: "1.3"
            }}>
              {product.name || "Product Name"}
            </h1>
            
            {product.description && (
              <p style={{ 
                color: "#666", 
                lineHeight: "1.6",
                fontSize: window.innerWidth < 768 ? "14px" : "16px",
                marginBottom: "20px"
              }}>
                {product.description}
              </p>
            )}
            
            {product.price && (
              <div style={{ marginBottom: "20px" }}>
                <span style={{ 
                  fontSize: window.innerWidth < 768 ? "20px" : "24px", 
                  fontWeight: "bold", 
                  color: "#00b388"
                }}>
                  From ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
              </div>
            )}

            {/* Ratings */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: "25px",
              flexWrap: 'wrap',
              gap: '5px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={window.innerWidth < 768 ? 16 : 18} 
                    fill={i < (product.rating || 0) ? '#00b388' : 'none'} 
                    stroke="#00b388" 
                    style={{ marginRight: "2px" }}
                  />
                ))}
              </div>
              <span style={{ 
                marginLeft: '10px', 
                color: '#666',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                {product.totalReviews || 0} reviews
              </span>
            </div>

            {/* Product Info */}
            <div style={{ marginBottom: "25px" }}>
              {product.category && (
                <p style={{ 
                  color: "#666", 
                  marginBottom: "8px",
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}>
                  <strong>Category:</strong> {String(product.category)}
                </p>
              )}
              
              {product.stock !== undefined && product.stock !== null && (
                <p style={{ 
                  color: "#666", 
                  marginBottom: "8px",
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}>
                  <strong>Stock:</strong> {String(product.stock)}
                </p>
              )}
              
              {product.isListed !== undefined && (
                <p style={{ 
                  color: "#666", 
                  marginBottom: "8px",
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}>
                  <strong>Status:</strong>
                  <span style={{ 
                    color: product.isListed ? '#28a745' : '#dc3545',
                    fontWeight: 'bold',
                    marginLeft: '8px'
                  }}>
                    {product.isListed ? 'Available' : 'Unavailable'}
                  </span>
                </p>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              style={styles.button}
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={() => navigate(`/editor/${product._id}`)}
              style={styles.button}
            >
              🎨 Customize / Upload Your Design
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={styles.reviewsSection}>
          <h3 style={{ 
            marginBottom: '20px',
            fontSize: window.innerWidth < 768 ? '18px' : '20px'
          }}>
            Leave a Review
          </h3>
          
          <div style={{ 
            display: 'flex', 
            gap: '6px', 
            marginBottom: '15px',
            justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
          }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                size={window.innerWidth < 768 ? 24 : 28} 
                onClick={() => setRating(s)}
                fill={rating >= s ? '#facc15' : 'none'} 
                stroke="#facc15"
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          
          <textarea 
            value={reviewText} 
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            style={{ 
              width: '100%', 
              minHeight: window.innerWidth < 768 ? '80px' : '100px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              marginBottom: '15px',
              resize: 'vertical'
            }} 
          />
          
          <div style={{ 
            display: 'flex', 
            gap: '10px',
            flexDirection: window.innerWidth < 480 ? 'column' : 'row'
          }}>
            <button 
              onClick={handleSubmitReview}
              style={{ 
                padding: '10px 20px',
                backgroundColor: '#00b388',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                flex: window.innerWidth < 480 ? 'none' : '1'
              }}
            >
              Submit Review
            </button>
            
            <button 
              onClick={() => setShowReviews(!showReviews)}
              style={{ 
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                flex: window.innerWidth < 480 ? 'none' : '1'
              }}
            >
              {showReviews ? "Hide Reviews" : "View Reviews"}
            </button>
          </div>

          {showReviews && product.reviews && (
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ fontSize: window.innerWidth < 768 ? '16px' : '18px' }}>
                Customer Reviews
              </h4>
              {product.reviews.map((rev, i) => (
                <div key={i} style={{ 
                  border: '1px solid #eee', 
                  borderRadius: '8px',
                  padding: window.innerWidth < 768 ? '12px' : '15px', 
                  marginBottom: '15px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        size={14} 
                        fill={j < rev.rating ? '#facc15' : 'none'} 
                        stroke="#facc15" 
                      />
                    ))}
                  </div>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: '1.5',
                    fontSize: window.innerWidth < 768 ? '14px' : '16px'
                  }}>
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Debug info - remove in production */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: window.innerWidth < 768 ? '10px' : '20px'
        }}>
          <details style={{ fontSize: "12px", color: "#666" }}>
            <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
              Debug Info (remove in production)
            </summary>
            <pre style={{ 
              background: "#f1f1f1", 
              padding: "15px", 
              overflow: "auto",
              borderRadius: '6px',
              fontSize: '11px'
            }}>
              {JSON.stringify(product, null, 2)}
            </pre>
          </details>
        </div>
        <Footer/>
      </div>
    </div>
  );
}