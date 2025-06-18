// Example usage of WebSocket service
import webSocketService from '@/services/websocket.service';

// Example user object
const currentUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

// Connect to WebSocket
webSocketService.connect(currentUser);

// Join chat room
const chatId = 1;
webSocketService.joinChat(chatId);

// Send typing indicators
webSocketService.startTyping(chatId);
// Later...
webSocketService.stopTyping(chatId);

// Send message
webSocketService.sendMessage(chatId, "Hello everyone!");

// Listen for events
webSocketService.onMessageReceived((message) => {
  console.log('New message:', message);
});

webSocketService.onTypingStart((data) => {
  console.log('User started typing:', data.user.name);
});

webSocketService.onTypingStop((data) => {
  console.log('User stopped typing:', data.user.name);
});

// Check connection status
if (webSocketService.isConnected()) {
  console.log('WebSocket is connected');
}

// Disconnect when done
webSocketService.disconnect();