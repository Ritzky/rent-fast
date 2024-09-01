// src/components/DocumentUpload.js

import React, { useState } from "react";
import convex from "../convexClient";
import axios from "axios";

const DocumentUpload = () => {
  const [document, setDocument] = useState(null);
  const [selfie, setSelfie] = useState(null);

  const verifyUser = convex.mutation("verifyUser");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload documents to a storage service (e.g., AWS S3, Firebase Storage)
      const documentUrl = await uploadFile(document);
      const selfieUrl = await uploadFile(selfie);

      // Call the verification mutation
      const response = await verifyUser({ userId: /* current user ID */, documentUrl, selfieUrl });
      
      alert(`Verification Status: ${response.verificationStatus}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const uploadFile = async (file) => {
    // Implement file upload logic
    // Example using Axios to upload to a storage service
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("https://your-storage-service.com/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.fileUrl;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Documents for Verification</h2>
      <input type="file" accept=".pdf,.jpg,.png" onChange={e => setDocument(e.target.files[0])} required />
      <input type="file" accept=".jpg,.png" onChange={e => setSelfie(e.target.files[0])} required />
      <button type="submit">Verify</button>
    </form>
  );
};

export default DocumentUpload;
