// convex/functions/matchWorker.ts

import { mutation } from "convex/server";
import axios from "axios";

export default mutation(async ({ db }, { maintenanceRequestId }) => {
  const request = await db.get("maintenanceRequests", maintenanceRequestId);
  const workers = await db.query("workers").collect();

  // Call external AI service to find the best worker
  const matchingResponse = await axios.post("https://api.your-ai-service.com/matchWorker", {
    workers,
    requestDescription: request.description,
    propertyLocation: request.propertyLocation, // Assuming propertyLocation is part of the request
  });

  const selectedWorker = matchingResponse.data.selectedWorker;

  if (!selectedWorker) {
    throw new Error("No suitable maintenance worker found");
  }

  // Assign worker to maintenance request
  await db.patch("maintenanceRequests", maintenanceRequestId, {
    assignedWorkerId: selectedWorker.id,
    status: "in-progress",
    updatedAt: Date.now(),
  });

  return { selectedWorker };
});
