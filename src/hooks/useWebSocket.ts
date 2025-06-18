import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import webSocketService from '@/services/websocket.service';

export const useWebSocket = () => {
  const { user, isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Connect to WebSocket
      if (user.name) {
        webSocketService.connect({ ...user, id: Number(user.id), name: user.name });
      } else {
        // Provide a fallback or handle the missing name case
        webSocketService.connect({ ...user, id: Number(user.id), name: '' });
      }

      // Set up event listeners
      webSocketService.onMessageReceived((message) => {
        console.log('Message received:', message);
        setMessages(prev => [...prev, message]);
      });

      webSocketService.onTypingStart((data) => {
        console.log('User started typing:', data);
      });

      webSocketService.onTypingStop((data) => {
        console.log('User stopped typing:', data);
      });

      // Check connection status periodically
      const checkConnection = () => {
        setIsConnected(webSocketService.isConnected());
      };

      const interval = setInterval(checkConnection, 1000);
      checkConnection(); // Initial check

      return () => {
        clearInterval(interval);
        webSocketService.disconnect();
      };
    } else {
      webSocketService.disconnect();
      setIsConnected(false);
      setMessages([]);
    }
  }, [isAuthenticated, user]);

  return {
    isConnected,
    messages,
    joinChat: (chatId: number) => webSocketService.joinChat(chatId),
    sendMessage: (chatId: number, content: string) => webSocketService.sendMessage(chatId, content),
    startTyping: (chatId: number) => webSocketService.startTyping(chatId),
    stopTyping: (chatId: number) => webSocketService.stopTyping(chatId),
  };
};