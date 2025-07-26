import React from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Original Business Cards",
    description: "The go-to for good quality and good value.",
    image: "/assets/cards/card7.jpg",
  },
  {
    title: "Luxe Business Cards",
    description: "Four layers of Mohawk Superfine paper.",
    image: "/assets/cards/card8.jpg",
  },
  {
    title: "Cotton Business Cards",
    description: "Made from T-shirt offcuts.",
    image: "/assets/cards/card9.jpg",
  },
  {
    title: "Super Business Cards",
    description: "Tough, long-lasting and rich in color.",
    image: "/assets/cards/card10.jpg",
  },
];

const BusinessCardGrid = () => {
  const navigate = useNavigate();

  const handleNavigate = (card) => {
    // You could pass state or params if needed
    navigate("/businesscardDetails", { state: { card } });
  };

  return (
    <div style={{ padding: "60px 20px", backgroundColor: "#fff" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {cards.map((card, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={card.image}
              alt={card.title}
              style={{ width: "100%", borderRadius: "12px" }}
            />
            <h3 style={{ fontSize: "20px", marginTop: "15px", fontWeight: "600" }}>
              {card.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}>
              {card.description}
            </p>
            <button
              onClick={() => handleNavigate(card)}
              style={{
                marginTop: "10px",
                padding: "8px 20px",
                backgroundColor: "#00B0B9",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Shop BusinessCards
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessCardGrid;
