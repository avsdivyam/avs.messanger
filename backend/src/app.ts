import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import chatRoutes from './routes/chat.routes';

// Create a Socket.IO server instance (to be attached to an HTTP server later)
export const io = new Server({ cors: { origin: "*" } });

dotenv.config();
const app = express();
export const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello, World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/v1/user', userRoutes)
app.use("/api/chats", chatRoutes);

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Join a chat room
  socket.on("chat:join", (chatId) => {
    socket.join(`chat-${chatId}`);
    console.log(`User joined chat-${chatId}`);
  });

  // Leave a chat room
  socket.on("chat:leave", (chatId) => {
    socket.leave(`chat-${chatId}`);
    console.log(`User left chat-${chatId}`);
  });

  // Typing indicators
  socket.on("typing:start", ({ chatId, user }) => {
    socket.to(`chat-${chatId}`).emit("typing:start", { user });
  });

  socket.on("typing:stop", ({ chatId, user }) => {
    socket.to(`chat-${chatId}`).emit("typing:stop", { user });
  });

  // Handle message sending
  socket.on("message:send", (message) => {
    const { chatId } = message;
    socket.to(`chat-${chatId}`).emit("message:new", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

export default app;