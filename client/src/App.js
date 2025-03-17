import React, { useState } from "react";
import UploadImage from "./components/UploadImage";
import UploadVideo from "./components/UploadVideo";

const App = () => {
  const [mode, setMode] = useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>YOLOv8 Object Detection</h1>
      <p style={styles.subheading}>Upload an image or video to perform object detection:</p>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setMode("image")}>
          Upload Image
        </button>
        <button style={styles.button} onClick={() => setMode("video")}>
          Upload Video
        </button>
      </div>

      <div style={styles.content}>
        {mode === "image" && <UploadImage />}
        {mode === "video" && <UploadVideo />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  heading: {
    color: "#333",
    fontSize: "28px",
  },
  subheading: {
    fontSize: "18px",
    color: "#666",
  },
  buttonContainer: {
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
  content: {
    marginTop: "30px",
  },
};

export default App;