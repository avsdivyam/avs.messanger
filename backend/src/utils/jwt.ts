import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
};

export const verifyToken = (req: Request, res: Response, next: import('express').NextFunction) => {
  const authHeader = req.headers["authorization"]; // Get entire Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1]; // Extract token part after 'Bearer'

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Validate token
    req.user = decoded; // Attach user info to request
    next(); // Move to next middleware or controller
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const decodeToken = (token: string): object | null => {
    try {
        return jwt.decode(token) as object;
    } catch (error) {
        console.error('Token decoding failed:', error);
        return null;
    }
};
export const isTokenValid = (token: string): boolean => {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        console.error('Token is invalid:', error);
        return false;
    }
};
export const getTokenFromHeaders = (headers: Record<string, string | undefined>): string | null => {
    const authHeader = headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};
export const getTokenFromCookies = (cookies: Record<string, string | undefined>): string | null => {
    return cookies['token'] || null;
};
export const getTokenFromRequest = (req: { headers: Record<string, string | undefined>; cookies: Record<string, string | undefined> }): string | null => {
    return getTokenFromHeaders(req.headers) || getTokenFromCookies(req.cookies);
};
export const getUserIdFromToken = (token: string): string | null => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'id' in decoded ? (decoded as any).id : null;
};
export const getUserRoleFromToken = (token: string): string | null => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'role' in decoded ? (decoded as any).role : null;
};
export const getUserEmailFromToken = (token: string): string | null => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'email' in decoded ? (decoded as any).email : null;
};
export const getUserNameFromToken = (token: string): string | null => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'name' in decoded ? (decoded as any).name : null;
};
export const getUserAvatarFromToken = (token: string): string | null => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'avatar' in decoded ? (decoded as any).avatar : null;
};
export const getUserDataFromToken = (token: string): { userId: string | null; role: string | null; email: string | null; name: string | null; avatar: string | null } => {
    return {
        userId: getUserIdFromToken(token),
        role: getUserRoleFromToken(token),
        email: getUserEmailFromToken(token),
        name: getUserNameFromToken(token),
        avatar: getUserAvatarFromToken(token)
    };
};
export const isUserAdmin = (token: string): boolean => {
    const role = getUserRoleFromToken(token);
    return role === 'admin';
};
export const isUserModerator = (token: string): boolean => {
    const role = getUserRoleFromToken(token);
    return role === 'moderator';
};
export const isUserAuthenticated = (token: string): boolean => {
    return isTokenValid(token) && getUserIdFromToken(token) !== null;
};
export const isUserGuest = (token: string): boolean => {
    return !isTokenValid(token) || getUserIdFromToken(token) === null;
};
export const isUserBanned = (token: string): boolean => {
    const role = getUserRoleFromToken(token);
    return role === 'banned';
};
export const isUserOnline = (token: string): boolean => {
    // This is a placeholder function. Implement your logic to check if the user is online.
    return true; // Assuming user is online for demonstration purposes.
};
export const isUserOffline = (token: string): boolean => {
    // This is a placeholder function. Implement your logic to check if the user is offline.
    return !isUserOnline(token);
};
export const isUserActive = (token: string): boolean => {
    // This is a placeholder function. Implement your logic to check if the user is active.
    return true; // Assuming user is active for demonstration purposes.
};
export const isUserInactive = (token: string): boolean => {
    // This is a placeholder function. Implement your logic to check if the user is inactive.
    return !isUserActive(token);
};
export const isUserVerified = (token: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'verified' in decoded ? (decoded as any).verified : false;
};
export const isUserUnverified = (token: string): boolean => {
    return !isUserVerified(token);
};
export const isUserSuspended = (token: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'suspended' in decoded ? (decoded as any).suspended : false;
};
export const isUserNotSuspended = (token: string): boolean => {
    return !isUserSuspended(token);
};
export const isUserPremium = (token: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'premium' in decoded ? (decoded as any).premium : false;
};
export const isUserNotPremium = (token: string): boolean => {
    return !isUserPremium(token);
};
export const isUserSubscribed = (token: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'subscribed' in decoded ? (decoded as any).subscribed : false;
};
export const isUserNotSubscribed = (token: string): boolean => {
    return !isUserSubscribed(token);
};
export const isUserFollowing = (token: string, userId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'following' in decoded ? (decoded as any).following.includes(userId) : false;
};
export const isUserNotFollowing = (token: string, userId: string): boolean => {
    return !isUserFollowing(token, userId);
};
export const isUserBlocked = (token: string, userId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'blocked' in decoded ? (decoded as any).blocked.includes(userId) : false;
};
export const isUserNotBlocked = (token: string, userId: string): boolean => {
    return !isUserBlocked(token, userId);
};
export const isUserFriend = (token: string, userId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'friends' in decoded ? (decoded as any).friends.includes(userId) : false;
};
export const isUserNotFriend = (token: string, userId: string): boolean => {
    return !isUserFriend(token, userId);
};
export const isUserInGroup = (token: string, groupId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'groups' in decoded ? (decoded as any).groups.includes(groupId) : false;
};
export const isUserNotInGroup = (token: string, groupId: string): boolean => {
    return !isUserInGroup(token, groupId);
};
export const isUserInChannel = (token: string, channelId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'channels' in decoded ? (decoded as any).channels.includes(channelId) : false;
};
export const isUserNotInChannel = (token: string, channelId: string): boolean => {
    return !isUserInChannel(token, channelId);
};
export const isUserInRoom = (token: string, roomId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'rooms' in decoded ? (decoded as any).rooms.includes(roomId) : false;
};
export const isUserNotInRoom = (token: string, roomId: string): boolean => {
    return !isUserInRoom(token, roomId);
};
export const isUserInChat = (token: string, chatId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'chats' in decoded ? (decoded as any).chats.includes(chatId) : false;
};
export const isUserNotInChat = (token: string, chatId: string): boolean => {
    return !isUserInChat(token, chatId);
};
export const isUserInConversation = (token: string, conversationId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'conversations' in decoded ? (decoded as any).conversations.includes(conversationId) : false;
};
export const isUserNotInConversation = (token: string, conversationId: string): boolean => {
    return !isUserInConversation(token, conversationId);
};
export const isUserInNotification = (token: string, notificationId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'notifications' in decoded ? (decoded as any).notifications.includes(notificationId) : false;
};
export const isUserNotInNotification = (token: string, notificationId: string): boolean => {
    return !isUserInNotification(token, notificationId);
};
export const isUserInMessage = (token: string, messageId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'messages' in decoded ? (decoded as any).messages.includes(messageId) : false;
};
export const isUserNotInMessage = (token: string, messageId: string): boolean => {
    return !isUserInMessage(token, messageId);
};
export const isUserInPost = (token: string, postId: string): boolean => {
    const decoded = decodeToken(token);
    return decoded && typeof decoded === 'object' && 'posts' in decoded ? (decoded as any).posts.includes(postId) : false;
};
export const isUserNotInPost = (token: string, postId: string): boolean => {
    return !isUserInPost(token, postId);
};
