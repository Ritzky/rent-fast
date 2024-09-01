// convex/functions/updatePropertyValue.ts

import { mutation } from "convex/server";
import axios from "axios";

export default mutation(async ({ db }, { propertyId }) => {
  const property = await db.get("properties", propertyId);

  // Call external AI service for property valuation
  const valuationResponse = await axios.post("https://api.your-ai-service.com/estimateValue", {
    address: property.address,
    size: property.size,
    amenities: property.amenities,
    isHMO: property.isHMO,
    // Additional property features
  });

  const estimatedValue = valuationResponse.data.estimatedValue;

  // Insert into propertyValues table
  await db.insert("propertyValues", {
    propertyId,
    estimatedValue,
    timestamp: Date.now(),
  });

  // Update property with current value
  await db.patch("properties", propertyId, { currentValue: estimatedValue });

  return { estimatedValue };
});
