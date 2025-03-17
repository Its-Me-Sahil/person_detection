import React, { useState } from "react";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [detections, setDetections] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setImageUrl(data.image_url);
      setDetections(data.detections);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload an Image for Object Detection</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} style={styles.button}>Upload</button>
      {imageUrl && (
        <div>
          <h3>Detected Image:</h3>
          <img src={imageUrl} alt="Detected" style={styles.image} />
          <h3>Detections:</h3>
          <ul>
            {detections.map((det, index) => (
              <li key={index}>{`${det.class} - Confidence: ${det.confidence.toFixed(2)}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  image: {
    marginTop: "120px",
    maxWidth: "50%",
    height: "auto",
  },
};

export default UploadImage;
