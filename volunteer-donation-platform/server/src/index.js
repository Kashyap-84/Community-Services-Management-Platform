import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";

import authRoutes from "./routes/auth.js";
import volunteerRoutes from "./routes/volunteers.js";
import donationRoutes from "./routes/donations.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/donations", donationRoutes);

const port = Number(process.env.PORT || 8080);

await connectDB(process.env.MONGO_URI);
app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`));
