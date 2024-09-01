// src/components/PropertyList.js

import React, { useEffect, useState } from "react";
import convex from "../convexClient";
import axios from "axios";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const fetchProperties = convex.query("listProperties"); // Implement listProperties query

  useEffect(() => {
    const getProperties = async () => {
      const data = await fetchProperties();
      setProperties(data);
    };
    getProperties();
  }, [fetchProperties]);

  return (
    <div>
      <h1>Available Properties</h1>
      <ul>
        {properties.map(prop => (
          <li key={prop.id}>
            <h2>{prop.address}</h2>
            <p>{prop.description}</p>
            <p>Rent: £{prop.rentalPrice}</p>
            {/* Add more property details and actions */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
