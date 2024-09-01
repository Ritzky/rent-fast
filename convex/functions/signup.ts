// convex/functions/signup.ts

import { mutation } from "convex/server";
import bcrypt from "bcryptjs";

export default mutation(async ({ db }, { email, password, firstName, lastName, phoneNumber }) => {
  // Check if user already exists
  const existingUser = await db.query("users").filter(u => u.email.equals(email)).first();
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert new user
  const userId = await db.insert("users", {
    email,
    passwordHash,
    role: "tenant",
    profile: {
      firstName,
      lastName,
      phoneNumber,
    },
  });

  return { userId };
});
