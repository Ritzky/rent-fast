// src/components/MaintenanceRequest.js

import { useState } from "react";
import convex from "../convexClient";

const MaintenanceRequest = () => {
  const [propertyId, setPropertyId] = useState("");
  const [description, setDescription] = useState("");

  const submitRequest = convex.mutation("submitMaintenanceRequest"); // Implement this mutation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitRequest({ propertyId, description });
      alert(`Maintenance Request ID: ${response.requestId}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Maintenance Request</h2>
      <input type="text" placeholder="Property ID" value={propertyId} onChange={e => setPropertyId(e.target.value)} required />
      <textarea placeholder="Describe the issue" value={description} onChange={e => setDescription(e.target.value)} required />
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default MaintenanceRequest;
