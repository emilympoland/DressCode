"use client";

import "./page.css";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Upload = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHasSelected, setHasSelectedFile] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleUpload = () => {
    if (!fileHasSelected && !imageUrl) {
      alert("Please upload file");
      return;
    }

    if (fileHasSelected && !imageUrl) {
      // Preview local file
      const localUrl = URL.createObjectURL(selectedFile);
      setPreviewSrc(localUrl);
    } else {
      // Preview external URL
      setPreviewSrc(imageUrl);
    }

    setPopupOpen(true);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setHasSelectedFile(true);
  };

  const handleConfirmUpload = () => {
    fetch(`${server_url}/api/closet/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // add this line
      body: JSON.stringify({
        image_url: imageUrl,
        clothing_type: "tops",
        season: "warm",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div id="upload-container">
      <h1>Upload New</h1>

      <div>
        <input type="file" onChange={onFileChange} id="upload-button" />
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          id="upload-url-input"
          style={{ color: "black" }} // this forces the text to be black
        />
        <button id="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>

      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        modal
        contentStyle={{
          backgroundColor: "#F9F4E7",
          width: "350px",
          height: "450px",
          borderRadius: "30px",
          padding: "30px",
        }}
      >
        {(close) => (
          <div className="modal">
            <div className="content">
              <p style={{ color: "black" }}>Image Preview</p>
              <img
                src={previewSrc}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="actions">
              <button
                className="action-buttons-popup"
                onClick={() => {
                  handleConfirmUpload();
                  setImageUrl("");
                  setSelectedFile(null);
                  setHasSelectedFile(false);
                  setPreviewSrc("");
                  close();
                }}
              >
                Re-Upload
              </button>

              <button className="action-buttons-popup">Save</button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Upload;
