import express, { Router } from "express";
const router: Router = express.Router();

router.post("/register", (req, res) => {
  res.status(201).send();
});

export { router as UserRoutes };