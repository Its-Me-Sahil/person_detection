import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [detections, setDetections] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a video file.");
      return;
    }

    setLoading(true);
    setError("");
    setDetections([]);
    setVideoUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDetections(response.data.detections);
      setVideoUrl(response.data.video_url);
    } catch (error) {
      console.error("Error uploading video:", error);
      setError("Failed to upload video. Please ensure the file is valid and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Upload Video"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {videoUrl && (
        <div style={styles.videoContainer}>
          <h3>Processed Video:</h3>
          <video controls src={videoUrl} style={styles.video} />
        </div>
      )}

      {detections.length > 0 && (
        <div style={styles.detections}>
          <h3>Detections:</h3>
          <ul>
            {detections.map((detection, index) => (
              <li key={index}>
                {detection.class} - Confidence: {detection.confidence.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "5px",
    transition: "0.3s",
  },
  videoContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  video: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  detections: {
    marginTop: "20px",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default UploadVideo;