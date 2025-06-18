import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const sendMessage = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id: chatId } = req.params;
  const { content } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        chatId: Number(chatId),
        senderId: userId,
      },
    });

    res.status(201).json(message);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { id: chatId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { chatId: Number(chatId) },
      orderBy: { createdAt: "asc" },
      include: { sender: true },
    });

    res.json(messages);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: errorMessage });
  }
};
