import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./CropImage.css"; // updated styling

function CropImage({ imageFile, isOpen, setIsOpen, onCropComplete, onSubmit }) {
  const [crop, setCrop] = useState({ unit: "%", width: 50, height: 50, x: 25, y: 25, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageFile) return;

    if (typeof imageFile === "string") {
      setImageSrc(imageFile);
    } else if (imageFile instanceof File || imageFile instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(imageFile);
    } else if (imageFile?.url) {
      setImageSrc(imageFile.url);
    } else if (imageFile?.file instanceof File || imageFile?.file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(imageFile.file);
    } else if (imageFile?.src) {
      setImageSrc(imageFile.src);
    }
  }, [imageFile]);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const size = Math.min(width, height) * 0.5;
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    setCrop({ unit: "px", width: size, height: size, x, y, aspect: 1 });
    imgRef.current = e.currentTarget;
  };

  const getCroppedImg = () => {
    if (!completedCrop || !imgRef.current) return null;

    const canvas = canvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg", 0.95);
    });
  };

  const handleCropComplete = async () => {
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      const previewUrl = URL.createObjectURL(croppedBlob);
      const newImage = { url: previewUrl, file: croppedFile, isExisting: false };

      onCropComplete(newImage);
    }
  };

  const handleSubmit = async () => {
    await handleCropComplete();
    if (onSubmit) onSubmit();
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setImageSrc(null);
    setCompletedCrop(null);
    setCrop({ unit: "%", width: 50, height: 50, x: 25, y: 25, aspect: 1 });
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Crop Image</h2>
          <button onClick={handleClose} className="close-btn">×</button>
        </div>

        {/* Content */}
        <div className="modal-body">
          <div className="crop-area-wrapper">
            <ReactCrop
              crop={crop}
              onChange={setCrop}
              onComplete={setCompletedCrop}
              aspect={1}
              minWidth={50}
              minHeight={50}
              keepSelection
              className="crop-area"
            >
              <img ref={imgRef} src={imageSrc} alt="Crop preview" onLoad={onImageLoad} />
            </ReactCrop>
          </div>

          <p className="instructions">
            Drag the corners to adjust. The image will be cropped to a square.
          </p>

          {completedCrop && (
            <div className="preview-section">
              <h3 className="preview-title">Preview</h3>
              <canvas ref={canvasRef} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            onClick={handleCropComplete}
            disabled={!completedCrop?.width || !completedCrop?.height}
            className="btn save"
          >
            Save Crop
          </button>
          <button onClick={handleSubmit} className="btn submit">Submit</button>
          <button onClick={handleClose} className="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CropImage;
