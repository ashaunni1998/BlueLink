import React, { useState } from "react";
import API_BASE_URL from "../../config"; // <- make sure this file exports the API_BASE_URL
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function CustomerRequirement({ orderId, productId }) {
  // const { orderId, productId } = useParams();
  console.log("URL Params:", { orderId, productId });
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [website, setWebsite] = useState("");
  const [backInfo, setBackInfo] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!orderId || !productId) {
      Swal.fire("Error", "Order ID and Product ID are required", "error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("productId", productId);
      formData.append("title", title);
      formData.append("content", JSON.stringify({ slogan, website, backInfo, extraNotes }));

      if (logoFile) {
        formData.append("images", logoFile); // backend expects images[]
      }

      const res = await fetch(`${API_BASE_URL}/order/custom-data`, {
        method: "POST",
        credentials: "include", // send cookies for auth
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", data.message, "success");
        console.log("Saved Custom Data:", data);
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Card Design</h1>
            <p className="text-gray-600 text-lg">
              Fill in your requirements to create the perfect business card
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Logo Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                Upload Logo
              </h3>

              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Logo Preview"
                      className="w-40 h-40 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 bg-gray-50">
                      <span className="text-sm font-medium">300×300</span>
                      <span className="text-xs">PNG/JPG</span>
                    </div>
                  )}
                </div>

                <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm">
                  Choose File
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Front Side */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Front Side Information</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Crafted Charm"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="e.g., Your Style, Your Identity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.yourwebsite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Back Side Information</h3>

              <textarea
                value={backInfo}
                onChange={(e) => setBackInfo(e.target.value)}
                placeholder="Enter contact information, address, phone number, email, social media links..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-vertical"
              />
            </div>

            {/* Extra Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Design Preferences</h3>

              <textarea
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                placeholder="Share any specific design ideas, color preferences, style requirements, or inspiration..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Ready to submit?</p>
                  <p>We'll review your requirements and create your business card design.</p>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Requirements"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
