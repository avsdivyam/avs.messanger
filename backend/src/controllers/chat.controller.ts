import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createChat = async (req: Request, res: Response) => {
  const { participantIds, isGroup = false, groupName } = req.body;
  const userId = req.user.userId;

  try {
    const chat = await prisma.chat.create({
      data: {
        isGroup,
        groupName: isGroup ? groupName : null,
        participants: {
          create: [
            ...participantIds.map((pid: number) => ({ userId: pid })),
            { userId }, // include self
          ],
        },
      },
      include: { participants: true },
    });

    res.status(201).json(chat);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const getMyChats = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const chats = await prisma.chatParticipant.findMany({
      where: { userId },
      include: {
        chat: {
          include: {
            participants: {
              include: { user: true },
            },
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        },
      },
    });

    const formatted = chats.map((cp) => cp.chat);
    res.json(formatted);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
