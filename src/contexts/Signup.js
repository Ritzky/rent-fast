// src/components/Signup.js

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { handleSignup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup(email, password, firstName, lastName, phoneNumber);
      alert("Signup successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
      <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
