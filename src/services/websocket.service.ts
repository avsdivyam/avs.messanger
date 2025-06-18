import { io, Socket } from "socket.io-client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Message {
  chatId: number;
  content: string;
  sender: User;
}

class WebSocketService {
  private socket: Socket | null = null;
  private currentUser: User | null = null;

  constructor() {
    // Initialize socket connection
    this.socket = io("http://localhost:5000", {
      transports: ['websocket', 'polling'],
      autoConnect: false,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  // Connect with user
  connect(user: User) {
    this.currentUser = user;
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.currentUser = null;
  }

  // Join chat room
  joinChat(chatId: number) {
    if (this.socket && this.socket.connected) {
      console.log('Joining chat:', chatId);
      this.socket.emit("chat:join", chatId);
    }
  }

  // Send typing start
  startTyping(chatId: number) {
    if (this.socket && this.socket.connected && this.currentUser) {
      this.socket.emit("typing:start", { chatId, user: this.currentUser });
    }
  }

  // Send typing stop
  stopTyping(chatId: number) {
    if (this.socket && this.socket.connected && this.currentUser) {
      this.socket.emit("typing:stop", { chatId, user: this.currentUser });
    }
  }

  // Send message
  sendMessage(chatId: number, content: string) {
    if (this.socket && this.socket.connected && this.currentUser) {
      const messageData = {
        chatId,
        content,
        sender: this.currentUser,
      };
      console.log('Sending message:', messageData);
      this.socket.emit("message:send", messageData);
    }
  }

  // Listen for events
  onMessageReceived(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('message:received', callback);
    }
  }

  onTypingStart(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('typing:start', callback);
    }
  }

  onTypingStop(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('typing:stop', callback);
    }
  }

  // Check connection status
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService();
export default webSocketService;