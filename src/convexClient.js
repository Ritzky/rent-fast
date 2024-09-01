// src/convexClient.js

import { ConvexReactClient } from "convex/react";
import config from "../convex.json";

const convex = new ConvexReactClient(config);

export default convex;
