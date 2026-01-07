import express from "express";
import { z } from "zod";
import { Donation } from "../models/Donation.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, requireRole("admin"), async (req, res) => {
  const items = await Donation.find().sort({ createdAt: -1 });
  res.json(items);
});

const createSchema = z.object({
  donorName: z.string().min(2),
  amount: z.number().min(1),
  currency: z.string().optional(),
  note: z.string().optional()
});

router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: parsed.error.issues });

  const donation = await Donation.create({ ...parsed.data, createdBy: req.user.sub });
  res.status(201).json(donation);
});

router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  await Donation.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
