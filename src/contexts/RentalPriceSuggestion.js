// src/components/RentalPriceSuggestion.js

import React, { useState } from "react";
import convex from "../convexClient";

const RentalPriceSuggestion = () => {
  const [propertyId, setPropertyId] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState(null);

  const predictRent = convex.mutation("predictRent");

  const handlePredict = async () => {
    try {
      const response = await predictRent({ propertyId });
      setSuggestedPrice(response.suggestedPrice);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Get Rental Price Suggestion</h2>
      <input type="text" placeholder="Property ID" value={propertyId} onChange={e => setPropertyId(e.target.value)} />
      <button onClick={handlePredict}>Predict Rent</button>
      {suggestedPrice && <p>Suggested Rent: £{suggestedPrice}</p>}
    </div>
  );
};

export default RentalPriceSuggestion;
