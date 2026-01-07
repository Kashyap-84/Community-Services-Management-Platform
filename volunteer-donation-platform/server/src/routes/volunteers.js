import express from "express";
import { z } from "zod";
import { Volunteer } from "../models/Volunteer.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, requireRole("admin"), async (req, res) => {
  const items = await Volunteer.find().populate("userId", "name email role");
  res.json(items);
});

const upsertSchema = z.object({
  phone: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availability: z.string().optional()
});

router.post("/me", requireAuth, async (req, res) => {
  const parsed = upsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues });

  const userId = req.user.sub;
  const updated = await Volunteer.findOneAndUpdate(
    { userId },
    { $set: { userId, ...parsed.data } },
    { upsert: true, new: true }
  );

  res.json(updated);
});

router.get("/me", requireAuth, async (req, res) => {
  const userId = req.user.sub;
  const item = await Volunteer.findOne({ userId });
  res.json(item);
});

export default router;
