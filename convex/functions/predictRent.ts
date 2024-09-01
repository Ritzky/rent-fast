// convex/functions/predictRent.ts

import { mutation } from "convex/server";
import axios from "axios";

export default mutation(async ({ db }, { propertyId }) => {
  const property = await db.get("properties", propertyId);

  // Call external AI service for rent prediction
  const predictionResponse = await axios.post("https://api.your-ai-service.com/predictRent", {
    address: property.address,
    size: property.size, // Assuming size is part of the property schema
    amenities: property.amenities,
    // Additional property features
  });

  const suggestedPrice = predictionResponse.data.suggestedPrice;

  // Insert into rentalPriceSuggestions table
  await db.insert("rentalPriceSuggestions", {
    propertyId,
    suggestedPrice,
    timestamp: Date.now(),
  });

  // Update property with suggested rental price
  await db.patch("properties", propertyId, { rentalPrice: suggestedPrice });

  return { suggestedPrice };
});
