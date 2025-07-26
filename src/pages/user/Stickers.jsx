import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./Stickers.css";

const stickers = [
  { id: 1, image: "/assets/cards/stickers1.jpg", title: "Flyer 1" },
  { id: 2, image: "/assets/cards/stickers2.jpg", title: "Flyer 2" },
  { id: 3, image: "/assets/cards/stickers3.jpg", title: "Flyer 3" },
  { id: 4, image: "/assets/cards/stickers4.jpg", title: "Flyer 4" },
  { id: 5, image: "/assets/cards/stickers5.jpg", title: "Flyer 5" },
  { id: 6, image: "/assets/cards/stickers6.jpg", title: "Flyer 6" },
  { id: 7, image: "/assets/cards/stickers7.jpg", title: "Flyer 7" },
  { id: 8, image: "/assets/cards/stickers8.jpg", title: "Flyer 8" },
];

function Stickers() {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/viewflyers/${id}`);
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <Header />

      <div className="flyer-container">
        {stickers.map((flyer) => (
          <div className="flyer-card animate-up" key={flyer.id}>
            <img src={flyer.image} alt={flyer.title} className="flyer-image" />
            <div className="flyer-actions">
              <button className="btn add">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button className="btn buy">Buy Now</button>
              <button className="btn view" onClick={() => handleViewDetails(flyer.id)}>
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Stickers;
