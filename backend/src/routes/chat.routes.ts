import express from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { createChat, getMyChats } from "../controllers/chat.controller";
import { sendMessage, getMessages } from "../controllers/message.controller";

const router = express.Router();

router.use(authenticate);

router.post("/", createChat);
router.get("/", getMyChats);
router.post("/:id/messages", sendMessage);
router.get("/:id/messages", getMessages);

export default router;
