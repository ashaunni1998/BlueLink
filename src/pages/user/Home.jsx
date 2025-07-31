import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeSlider from "./HomeSlider";
import { useState } from "react";
import { Link } from "react-router-dom";



const Home = () => {

    const [showModal, setShowModal] = useState(false);

const handleShopNowClick = () => {
  const isLoggedIn = false; // Replace with real auth check
  if (!isLoggedIn) {
    setShowModal(true);
  } else {
    // Proceed to cart or product detail
  }
};

const handleLoginRedirect = () => {
  window.location.href = "/login"; // Adjust route as needed
};


const styles = {
    section: {
      backgroundColor: "#f7f9f7",
      padding: "40px 20px",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    logosRow: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "40px",
      marginBottom: "40px",
    },
    logo: {
      maxHeight: "40px",
      objectFit: "contain",
    },
    trustpilotBlock: {
      marginBottom: "40px",
    },
    trustpilotStars: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      gap: "2px",
    },
    reviewCards: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      padding: "0 20px",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      width: "300px",
      textAlign: "left",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    },
    stars: {
      display: "flex",
      gap: "2px",
      marginBottom: "10px",
    },
    starIcon: {
      width: "20px",
      height: "20px",
    },
    reviewTitle: {
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "6px",
    },
    reviewText: {
      fontSize: "14px",
      color: "#333",
      marginBottom: "10px",
    },
    reviewer: {
      fontSize: "13px",
      color: "#555",
      fontWeight: "bold",
    },
    timeAgo: {
      fontWeight: "normal",
      color: "#999",
      fontSize: "12px",
    },
  };

 const logos = [
  { alt: "Uber", src: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
  { alt: "Calm", src: "/homeimages/calm.svg",  style:{height:"600px"}},
  { alt: "Glossier", src: "/homeimages/glossier.svg"},
  { alt: "Etsy", src: "/homeimages/etsy.svg" },
  { alt: "Airbnb", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/512px-Airbnb_Logo_Bélo.svg.png" },
  { alt: "TED", src: "/homeimages/TED.svg" },
];

  const reviews = [
    {
      stars: 5,
      title: "Simple quick excellence",
      text: "It was a simple process to design my business card. They were quickly shipped a...",
      author: "Barry Weber",
      time: "12 hours ago",
    },
    {
      stars: 5,
      title: "Moo’s platform is easy to navigate",
      text: "Moo’s platform is easy to navigate. I love the cards I designed. Having my art o...",
      author: "Kimberly Brayman",
      time: "12 hours ago",
    },
    {
      stars: 5,
      title: "ABSOLUTELY AMAZING SERVICE!!",
      text: "Orders these cards for a game with my boyfriend and...",
      author: "OliviaDoodles",
      time: "1 day ago",
    },
  ];

  const Star = () => (
      <svg
    width="60px"
    height=""
    viewBox="0 0 46 46"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="tp-star">
      <path
        className="tp-star__canvas"
        fill="#dcdce6"
        d="M0 46.330002h46.375586V0H0z"
      />
      <path
        className="tp-star__shape"
        fill="#FFF"
        d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z"
      />
    </g>
  </svg>
  );
  return (
    <div style={{ fontFamily: "Arial, sans-serif",   width:"90%" , margin: '0 auto'}} >
      {/* Navbar */}
      {/* <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h1 style={{ color: "#007bff", fontSize: "24px" }}>BlueLink Printing</h1>
        <ul style={{ display: "flex", listStyle: "none", gap: "30px", margin: 0 }}>
          <li style={{ cursor: "pointer" }}>Home</li>
          <li style={{ cursor: "pointer" }}>Services</li>
          <li style={{ cursor: "pointer" }}>Upload</li>
          <li style={{ cursor: "pointer" }}>Contact</li>
        </ul>
      </nav> */}
      <Header/>

      {/* Hero Section */}
      <HomeSlider/>
      {/* Features Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#ffffff" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "40px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "300px" }}>
            <img
              src="https://img.icons8.com/ios-filled/100/007bff/blueprint.png"
              alt="Print"
              style={{ marginBottom: "15px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>High-Quality Prints</h3>
            <p style={{ color: "#666" }}>
              Crisp, clear, and durable blueprint prints for professionals.
            </p>
          </div>
          <div style={{ maxWidth: "300px" }}>
            <img
              src="https://img.icons8.com/ios-filled/100/007bff/shipped.png"
              alt="Delivery"
              style={{ marginBottom: "15px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Fast Delivery</h3>
            <p style={{ color: "#666" }}>
              Next-day delivery available for urgent projects and deadlines.
            </p>
          </div>
          <div style={{ maxWidth: "300px" }}>
            <img
              src="https://img.icons8.com/ios-filled/100/007bff/customer-support.png"
              alt="Support"
              style={{ marginBottom: "15px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Customer Support</h3>
            <p style={{ color: "#666" }}>
              Reach out any time—our team is here to help you succeed.
            </p>
          </div>
        </div>
      </section>
{/* Popular Products Section */}
<section style={{ backgroundColor: "#f5f8f6", padding: "60px 20px", textAlign: "center" }}>
  <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: "600", color: "#111" }}>
    Popular products
  </h2>
  <p style={{ fontSize: "16px", color: "#666", marginBottom: "40px" }}>
    These are tried and true favorites that will have you set to get down to business.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}
  >
    {[
      {
        image: "https://static.vecteezy.com/system/resources/previews/000/256/401/non_2x/abstract-wavy-visiting-card-template-vector.jpg",
        label: "Shop Business Cards",
        link: "/businessCard",
      },
      {
        image: "https://img.elegantflyer.com/templates/preview/free-business-card-set-73923.jpg",
        label: "Shop Postcards",
        link: "/postCards",
      },
      {
        image: "https://img.freepik.com/free-vector/modern-black-white-business-card-design_1017-14939.jpg?semt=ais_hybrid&w=740",
        label: "Shop Flyers",
        link: "/flyers",
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzzvpMzVl3soLGN18QJBgHPilLGuWNL1RVWw&s",
        label: "Shop Stickers & Labels",
        link: "/stickers",
      },
      {
        image: "https://www.shutterstock.com/image-vector/professional-minimalist-business-card-design-600nw-2316957167.jpg",
        label: "Shop Stationery",
        link: "/stationery",
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtxgvGY02u7_ujy2D-rhzSh9QRpa4UIIUVQ&s",
        label: "Shop Personalized Gift",
        link: "/personalized-gift",
      },
      {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy45Tw4PCBCuwhdSXRMQu3WDpjInDCIG8jeA&s",
        label: "Shop Tshirt Printing",
        link: "/tshirtprinting",
      },
      {
        image: "https://png.pngtree.com/template/20200714/ourmid/pngtree-blue-abstract-business-card-image_391818.jpg",
        label: "Shop Button Badges",
        link: "/buttonbadges",
      },
    ].map((product, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "#fff",
          borderRadius: "6px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ height: "160px", overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div style={{ padding: "12px", borderTop: "1px solid #eee", textAlign: "center" }}>
          <a
            href={product.link}
            style={{
              color: "#007a5e",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            {product.label} &gt;
          </a>
        </div>
      </div>
    ))}
  </div>
</section>






<section
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
  }}
>
  <div
    style={{
      flex: "1 1 300px",
      minWidth: "300px",
      maxWidth: "500px",
      height: "300px",
      backgroundImage: "url('/homeimages/flyer.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "8px",
    }}
  />
  <div
    style={{
      flex: "1 1 300px",
      minWidth: "300px",
      maxWidth: "500px",
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginTop: "20px",
    }}
  >
    <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Flyers & Leaflets.</h1>
    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
      Get creative with your Flyer printing.
      <br />
      Choose from fancy finishes and premium papers.
    </p>
  </div>
</section>



   {/* Reviews Section */}
      {/* <section style={styles.section}>
      
        <div style={styles.logosRow}>
          {logos.map((logo) => (
            <img key={logo.alt} src={logo.src} alt={logo.alt}  style={{ ...styles.logo, ...logo.style }} height="40" />
          ))}
        </div>

      
        <div style={styles.trustpilotBlock}>
          <h2 style={{ fontSize: "20px", margin: "10px 0" }}>Excellent</h2>
          <div style={styles.trustpilotStars}>
            {[...Array(4)].map((_, i) => (
              <Star key={i} />
            ))}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Trustpilot_star_half.svg"
              alt="half star"
              style={styles.starIcon}
            />
          </div>
          <p style={{ fontSize: "14px", margin: "6px 0" }}>Based on 18,145 reviews</p>
          <div style={{ color: "#00b67a", fontWeight: "bold" }}>★ Trustpilot</div>
        </div>

        
        <div style={styles.reviewCards}>
          {reviews.map((review, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.stars}>
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <div style={styles.reviewTitle}>{review.title}</div>
              <div style={styles.reviewText}>{review.text}</div>
              <div style={styles.reviewer}>
                {review.author}, <span style={styles.timeAgo}>{review.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section> */}


<section
  style={{
    backgroundColor: "#f5f5f5",
    padding: "60px 20px",
  }}
>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "30px",
      justifyContent: "center",
    }}
  >
    {/* Business Card Design Examples */}
    <div
      style={{
        backgroundColor: "#fff",
        maxWidth: "500px",
        flex: "1 1 300px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src="/homeimages/business-cards-sample.jpg"
        alt="Business Card Examples"
        style={{ width: "100%", height: "auto" }}
      />
      <div style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
          10 Business Card design examples
        </h3>
        <p style={{ fontSize: "15px", color: "#555", marginBottom: "16px" }}>
          MOO’s designers share 10 standout business cards from different industries.
        </p>
        <a
          href="#"
          style={{
            color: "#007a5e",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Read more &gt;
        </a>
      </div>
    </div>

    {/* Invites Section */}
    <div
      style={{
        backgroundColor: "#fff",
        maxWidth: "500px",
        flex: "1 1 300px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src="/homeimages/invites-sample.jpg"
        alt="Event Invitations"
        style={{ width: "100%", height: "auto" }}
      />
      <div style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
          Invites they won’t ignore
        </h3>
        <p style={{ fontSize: "15px", color: "#555", marginBottom: "16px" }}>
          How to create paper invites that actually get a “yes.”
        </p>
        <a
          href="#"
          style={{
            color: "#007a5e",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Read more &gt;
        </a>
      </div>
    </div>
  </div>
</section>

<section
  style={{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "60px 20px",
  }}
>
  {/* Left Side - Image */}
  <div
    style={{
      flex: "1 1 50%",
      minWidth: "300px",
      maxWidth: "800px",
      padding: "20px",
      textAlign: "center",
    }}
  >
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd19vInA8bUX20OregUR32xvV6CbNZ_kMhDQ&s" // Replace with flyer image if available
      alt="Flyers & Leaflets"
      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
    />
  </div>

  {/* Right Side - Text Card */}
  <div
    style={{
      flex: "1 1 400px",
      maxWidth: "500px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "40px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      margin: "20px",
    }}
  >
    <h2 style={{ fontSize: "28px", marginBottom: "20px", fontWeight: "600", color: "#111" }}>
      Flyers & Leaflets. Spread the word.
    </h2>
    <p style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}>
      Make your message loud and clear with professional, high-impact flyers and leaflets – ideal for promotions, menus, and more.
    </p>
    <a
      href="#"
      style={{
        fontSize: "16px",
        color: "#007a5e",
        fontWeight: "600",
        textDecoration: "none",
      }}
    >
      Shop Flyers & Leaflets &gt;
    </a>
  </div>
</section>
<section
  style={{
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "60px 20px",
  }}
>
  {/* Left Side - Image */}
  <div
    style={{
      flex: "1 1 50%",
      minWidth: "300px",
      maxWidth: "800px",
      padding: "20px",
      textAlign: "center",
    }}
  >
    <img
      src="https://thesignaturebox.com/cdn/shop/articles/personalised-gifts-5-things-to-consider-before-choosing-personalized-gifts-294055.jpg?v=1706979689&width=1280" // Replace with flyer image if available
      alt="Flyers & Leaflets"
      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
    />
  </div>

  {/* Right Side - Text Card */}
  <div
    style={{
      flex: "1 1 400px",
      maxWidth: "500px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "40px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      margin: "20px",
    }}
  >
    <h2 style={{ fontSize: "28px", marginBottom: "20px", fontWeight: "600", color: "#111" }}>
  Personalized Gift. Make it special.
</h2>
<p style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}>
  Add a personal touch with custom gifts perfect for any occasion – from birthdays to business branding.
</p>

    <a
      href="#"
      style={{
        fontSize: "16px",
        color: "#007a5e",
        fontWeight: "600",
        textDecoration: "none",
      }}
    >
      Shop Flyers & Leaflets &gt;
    </a>
  </div>
</section>

      {/* CTA Banner */}
      <section
        style={{
          padding: "60px 20px",
          backgroundColor: "#007bff",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>
          Let’s Get Your Plans Printed!
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "25px" }}>
          Simple process. High-quality. Always on time.
        </p>
       <a href="/sign-in" ><button
          style={{
            padding: "10px 28px",
            fontSize: "16px",
            backgroundColor: "#ffffff",
            color: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Start Now
        </button></a>
      </section>

    
      <Footer/>
    </div>

  );
};

export default Home;
