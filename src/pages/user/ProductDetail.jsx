// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();  // grab product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://kerala-digital-park-server.vercel.app/api/productDetails/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: "20px" }}>
        <h1>p</h1>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
