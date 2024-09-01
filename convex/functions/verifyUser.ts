// convex/functions/verifyUser.ts

import { mutation } from "convex/server";
import axios from "axios";

export default mutation(async ({ db }, { userId, documentUrl, selfieUrl }) => {
  // Call external AI service for document verification
  const documentVerificationResponse = await axios.post("https://api.your-ai-service.com/verifyDocument", {
    documentUrl,
  });

  // Call external AI service for face matching
  const faceMatchingResponse = await axios.post("https://api.your-ai-service.com/matchFace", {
    documentUrl,
    selfieUrl,
  });

  // Determine verification status
  const isDocumentValid = documentVerificationResponse.data.isValid;
  const isFaceMatch = faceMatchingResponse.data.isMatch;

  const verificationStatus = isDocumentValid && isFaceMatch ? "verified" : "rejected";

  // Update verifications table
  await db.insert("verifications", {
    userId,
    documentType: "ID",
    documentUrl,
    verificationStatus,
    timestamp: Date.now(),
  });

  return { verificationStatus };
});

