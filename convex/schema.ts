
import { defineSchema, defineTable } from "convex/schema";

export default defineSchema({
  users: defineTable({
    email: { type: "string", optional: false, unique: true },
    passwordHash: "string",
    role: { type: "string", default: "tenant" }, // roles: tenant, landlord, maintenance
    profile: {
      firstName: "string",
      lastName: "string",
      phoneNumber: "string",
      // Additional profile fields
    },
  }),
  properties: defineTable({
    address: "string",
    description: "string",
    landlordId: "string",
    rentalPrice: "number",
    currentValue: "number",
    lastUpdated: "number",
    isHMO: { type: "boolean", default: false },
    // Additional property fields
  }),
  maintenanceRequests: defineTable({
    propertyId: "string",
    tenantId: "string",
    description: "string",
    status: { type: "string", default: "pending" }, // statuses: pending, in-progress, completed
    assignedWorkerId: { type: "string", optional: true },
    createdAt: "number",
    updatedAt: "number",
  }),
  workers: defineTable({
    name: "string",
    skills: "string[]",
    rating: "number",
    availability: "boolean",
    location: "string",
    // Additional worker fields
  }),
  verifications: defineTable({
    userId: "string",
    documentType: "string",
    documentUrl: "string",
    verificationStatus: { type: "string", default: "pending" }, // statuses: pending, verified, rejected
    timestamp: "number",
  }),
  rentalPriceSuggestions: defineTable({
    propertyId: "string",
    suggestedPrice: "number",
    timestamp: "number",
  }),
  propertyValues: defineTable({
    propertyId: "string",
    estimatedValue: "number",
    timestamp: "number",
  }),
});