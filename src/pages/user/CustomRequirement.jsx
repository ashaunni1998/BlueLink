import React, { useState } from "react";
import "./CustomRequirement.css";

export default function CustomRequirement() {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [normalInfo, setNormalInfo] = useState("");
  const [extraDetails, setExtraDetails] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitNeed = async () => {
    const requirementData = new FormData();
    requirementData.append("name", name);
    images.forEach((file) => requirementData.append("images", file));
    requirementData.append("normalInfo", normalInfo);
    requirementData.append("extraDetails", extraDetails);

    try {
      const res = await fetch("http://localhost:3000/api/order/custom-data", {
        method: "POST",
        credentials: "include", // if using authentication cookies
        body: requirementData,
      });

      const data = await res.json();
      console.log("Submitted Requirement:", data);

      // Reset form
      setName("");
      setImages([]);
      setImagePreviews([]);
      setNormalInfo("");
      setExtraDetails("");
    } catch (error) {
      console.error("Error submitting requirement:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3 className="profile-title">Custom Requirement</h3>
        <p className="profile-subtitle">Upload logo, enter details, and notes.</p>
      </div>

      <div className="profile-content">
        {/* Left side: Logo/Image Upload */}
        <div className="logo-upload">
          {imagePreviews.length > 0 ? (
            <div className="logo-preview">
              <img src={imagePreviews[0]} alt="Logo Preview" />
              <button onClick={() => handleRemoveImage(0)} className="remove-btn">
                ✕
              </button>
            </div>
          ) : (
            <div className="placeholder-box">
              <span>Recommended: 300×300 (PNG/JPG)</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        {/* Right side: Details */}
        <div className="details-form">
          <label className="label">Header Details</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Crafted Charm"
            className="input-box"
          />

          <label className="label">Normal Information</label>
          <textarea
            value={normalInfo}
            onChange={(e) => setNormalInfo(e.target.value)}
            placeholder="Describe your store or add instructions..."
            className="textarea"
          />

          <label className="label">Extra Details</label>
          <textarea
            value={extraDetails}
            onChange={(e) => setExtraDetails(e.target.value)}
            placeholder="Enter extra notes, design ideas..."
            className="textarea"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="profile-footer">
        <button onClick={handleSubmitNeed} className="save-btn">
          Save Profile
        </button>
      </div>
    </div>
  );
}
