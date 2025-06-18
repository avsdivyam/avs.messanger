"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserNotInMessage = exports.isUserInMessage = exports.isUserNotInNotification = exports.isUserInNotification = exports.isUserNotInConversation = exports.isUserInConversation = exports.isUserNotInChat = exports.isUserInChat = exports.isUserNotInRoom = exports.isUserInRoom = exports.isUserNotInChannel = exports.isUserInChannel = exports.isUserNotInGroup = exports.isUserInGroup = exports.isUserNotFriend = exports.isUserFriend = exports.isUserNotBlocked = exports.isUserBlocked = exports.isUserNotFollowing = exports.isUserFollowing = exports.isUserNotSubscribed = exports.isUserSubscribed = exports.isUserNotPremium = exports.isUserPremium = exports.isUserNotSuspended = exports.isUserSuspended = exports.isUserUnverified = exports.isUserVerified = exports.isUserInactive = exports.isUserActive = exports.isUserOffline = exports.isUserOnline = exports.isUserBanned = exports.isUserGuest = exports.isUserAuthenticated = exports.isUserModerator = exports.isUserAdmin = exports.getUserDataFromToken = exports.getUserAvatarFromToken = exports.getUserNameFromToken = exports.getUserEmailFromToken = exports.getUserRoleFromToken = exports.getUserIdFromToken = exports.getTokenFromRequest = exports.getTokenFromCookies = exports.getTokenFromHeaders = exports.isTokenValid = exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
exports.isUserNotInPost = exports.isUserInPost = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Get entire Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1]; // Extract token part after 'Bearer'
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Validate token
        req.user = decoded; // Attach user info to request
        next(); // Move to next middleware or controller
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        console.error('Token decoding failed:', error);
        return null;
    }
};
exports.decodeToken = decodeToken;
const isTokenValid = (token) => {
    try {
        jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return true;
    }
    catch (error) {
        console.error('Token is invalid:', error);
        return false;
    }
};
exports.isTokenValid = isTokenValid;
const getTokenFromHeaders = (headers) => {
    const authHeader = headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
};
exports.getTokenFromHeaders = getTokenFromHeaders;
const getTokenFromCookies = (cookies) => {
    return cookies['token'] || null;
};
exports.getTokenFromCookies = getTokenFromCookies;
const getTokenFromRequest = (req) => {
    return (0, exports.getTokenFromHeaders)(req.headers) || (0, exports.getTokenFromCookies)(req.cookies);
};
exports.getTokenFromRequest = getTokenFromRequest;
const getUserIdFromToken = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'id' in decoded ? decoded.id : null;
};
exports.getUserIdFromToken = getUserIdFromToken;
const getUserRoleFromToken = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'role' in decoded ? decoded.role : null;
};
exports.getUserRoleFromToken = getUserRoleFromToken;
const getUserEmailFromToken = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'email' in decoded ? decoded.email : null;
};
exports.getUserEmailFromToken = getUserEmailFromToken;
const getUserNameFromToken = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'name' in decoded ? decoded.name : null;
};
exports.getUserNameFromToken = getUserNameFromToken;
const getUserAvatarFromToken = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'avatar' in decoded ? decoded.avatar : null;
};
exports.getUserAvatarFromToken = getUserAvatarFromToken;
const getUserDataFromToken = (token) => {
    return {
        userId: (0, exports.getUserIdFromToken)(token),
        role: (0, exports.getUserRoleFromToken)(token),
        email: (0, exports.getUserEmailFromToken)(token),
        name: (0, exports.getUserNameFromToken)(token),
        avatar: (0, exports.getUserAvatarFromToken)(token)
    };
};
exports.getUserDataFromToken = getUserDataFromToken;
const isUserAdmin = (token) => {
    const role = (0, exports.getUserRoleFromToken)(token);
    return role === 'admin';
};
exports.isUserAdmin = isUserAdmin;
const isUserModerator = (token) => {
    const role = (0, exports.getUserRoleFromToken)(token);
    return role === 'moderator';
};
exports.isUserModerator = isUserModerator;
const isUserAuthenticated = (token) => {
    return (0, exports.isTokenValid)(token) && (0, exports.getUserIdFromToken)(token) !== null;
};
exports.isUserAuthenticated = isUserAuthenticated;
const isUserGuest = (token) => {
    return !(0, exports.isTokenValid)(token) || (0, exports.getUserIdFromToken)(token) === null;
};
exports.isUserGuest = isUserGuest;
const isUserBanned = (token) => {
    const role = (0, exports.getUserRoleFromToken)(token);
    return role === 'banned';
};
exports.isUserBanned = isUserBanned;
const isUserOnline = (token) => {
    // This is a placeholder function. Implement your logic to check if the user is online.
    return true; // Assuming user is online for demonstration purposes.
};
exports.isUserOnline = isUserOnline;
const isUserOffline = (token) => {
    // This is a placeholder function. Implement your logic to check if the user is offline.
    return !(0, exports.isUserOnline)(token);
};
exports.isUserOffline = isUserOffline;
const isUserActive = (token) => {
    // This is a placeholder function. Implement your logic to check if the user is active.
    return true; // Assuming user is active for demonstration purposes.
};
exports.isUserActive = isUserActive;
const isUserInactive = (token) => {
    // This is a placeholder function. Implement your logic to check if the user is inactive.
    return !(0, exports.isUserActive)(token);
};
exports.isUserInactive = isUserInactive;
const isUserVerified = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'verified' in decoded ? decoded.verified : false;
};
exports.isUserVerified = isUserVerified;
const isUserUnverified = (token) => {
    return !(0, exports.isUserVerified)(token);
};
exports.isUserUnverified = isUserUnverified;
const isUserSuspended = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'suspended' in decoded ? decoded.suspended : false;
};
exports.isUserSuspended = isUserSuspended;
const isUserNotSuspended = (token) => {
    return !(0, exports.isUserSuspended)(token);
};
exports.isUserNotSuspended = isUserNotSuspended;
const isUserPremium = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'premium' in decoded ? decoded.premium : false;
};
exports.isUserPremium = isUserPremium;
const isUserNotPremium = (token) => {
    return !(0, exports.isUserPremium)(token);
};
exports.isUserNotPremium = isUserNotPremium;
const isUserSubscribed = (token) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'subscribed' in decoded ? decoded.subscribed : false;
};
exports.isUserSubscribed = isUserSubscribed;
const isUserNotSubscribed = (token) => {
    return !(0, exports.isUserSubscribed)(token);
};
exports.isUserNotSubscribed = isUserNotSubscribed;
const isUserFollowing = (token, userId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'following' in decoded ? decoded.following.includes(userId) : false;
};
exports.isUserFollowing = isUserFollowing;
const isUserNotFollowing = (token, userId) => {
    return !(0, exports.isUserFollowing)(token, userId);
};
exports.isUserNotFollowing = isUserNotFollowing;
const isUserBlocked = (token, userId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'blocked' in decoded ? decoded.blocked.includes(userId) : false;
};
exports.isUserBlocked = isUserBlocked;
const isUserNotBlocked = (token, userId) => {
    return !(0, exports.isUserBlocked)(token, userId);
};
exports.isUserNotBlocked = isUserNotBlocked;
const isUserFriend = (token, userId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'friends' in decoded ? decoded.friends.includes(userId) : false;
};
exports.isUserFriend = isUserFriend;
const isUserNotFriend = (token, userId) => {
    return !(0, exports.isUserFriend)(token, userId);
};
exports.isUserNotFriend = isUserNotFriend;
const isUserInGroup = (token, groupId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'groups' in decoded ? decoded.groups.includes(groupId) : false;
};
exports.isUserInGroup = isUserInGroup;
const isUserNotInGroup = (token, groupId) => {
    return !(0, exports.isUserInGroup)(token, groupId);
};
exports.isUserNotInGroup = isUserNotInGroup;
const isUserInChannel = (token, channelId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'channels' in decoded ? decoded.channels.includes(channelId) : false;
};
exports.isUserInChannel = isUserInChannel;
const isUserNotInChannel = (token, channelId) => {
    return !(0, exports.isUserInChannel)(token, channelId);
};
exports.isUserNotInChannel = isUserNotInChannel;
const isUserInRoom = (token, roomId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'rooms' in decoded ? decoded.rooms.includes(roomId) : false;
};
exports.isUserInRoom = isUserInRoom;
const isUserNotInRoom = (token, roomId) => {
    return !(0, exports.isUserInRoom)(token, roomId);
};
exports.isUserNotInRoom = isUserNotInRoom;
const isUserInChat = (token, chatId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'chats' in decoded ? decoded.chats.includes(chatId) : false;
};
exports.isUserInChat = isUserInChat;
const isUserNotInChat = (token, chatId) => {
    return !(0, exports.isUserInChat)(token, chatId);
};
exports.isUserNotInChat = isUserNotInChat;
const isUserInConversation = (token, conversationId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'conversations' in decoded ? decoded.conversations.includes(conversationId) : false;
};
exports.isUserInConversation = isUserInConversation;
const isUserNotInConversation = (token, conversationId) => {
    return !(0, exports.isUserInConversation)(token, conversationId);
};
exports.isUserNotInConversation = isUserNotInConversation;
const isUserInNotification = (token, notificationId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'notifications' in decoded ? decoded.notifications.includes(notificationId) : false;
};
exports.isUserInNotification = isUserInNotification;
const isUserNotInNotification = (token, notificationId) => {
    return !(0, exports.isUserInNotification)(token, notificationId);
};
exports.isUserNotInNotification = isUserNotInNotification;
const isUserInMessage = (token, messageId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'messages' in decoded ? decoded.messages.includes(messageId) : false;
};
exports.isUserInMessage = isUserInMessage;
const isUserNotInMessage = (token, messageId) => {
    return !(0, exports.isUserInMessage)(token, messageId);
};
exports.isUserNotInMessage = isUserNotInMessage;
const isUserInPost = (token, postId) => {
    const decoded = (0, exports.decodeToken)(token);
    return decoded && typeof decoded === 'object' && 'posts' in decoded ? decoded.posts.includes(postId) : false;
};
exports.isUserInPost = isUserInPost;
const isUserNotInPost = (token, postId) => {
    return !(0, exports.isUserInPost)(token, postId);
};
exports.isUserNotInPost = isUserNotInPost;
