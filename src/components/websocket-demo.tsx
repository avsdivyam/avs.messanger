"use client";

import React, { useState, useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

export const WebSocketDemo: React.FC = () => {
  const { isConnected, messages, joinChat, sendMessage, startTyping, stopTyping } = useWebSocket();
  const [currentChatId, setCurrentChatId] = useState<number>(1);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Join chat when component mounts or chat changes
  useEffect(() => {
    if (isConnected) {
      joinChat(currentChatId);
    }
  }, [isConnected, currentChatId, joinChat]);

  const handleSendMessage = () => {
    if (messageText.trim() && isConnected) {
      sendMessage(currentChatId, messageText.trim());
      setMessageText('');
      
      // Stop typing when message is sent
      if (isTyping) {
        stopTyping(currentChatId);
        setIsTyping(false);
      }
    }
  };

  const handleTyping = (value: string) => {
    setMessageText(value);
    
    if (value.trim() && !isTyping) {
      startTyping(currentChatId);
      setIsTyping(true);
    } else if (!value.trim() && isTyping) {
      stopTyping(currentChatId);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">WebSocket Demo</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Chat Room Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Chat Room:
        </label>
        <select
          value={currentChatId}
          onChange={(e) => setCurrentChatId(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1}>Chat Room 1</option>
          <option value={2}>Chat Room 2</option>
          <option value={3}>Chat Room 3</option>
        </select>
      </div>

      {/* Messages Display */}
      <div className="border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet...</p>
        ) : (
          messages
            .filter(msg => msg.chatId === currentChatId)
            .map((message, index) => (
              <div key={index} className="mb-2 p-2 bg-white rounded border">
                <div className="text-sm font-medium text-blue-600">
                  {message.sender?.name || 'Unknown'}
                </div>
                <div className="text-gray-800">{message.content}</div>
              </div>
            ))
        )}
      </div>

      {/* Message Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={!isConnected}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || !messageText.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

      {/* WebSocket Actions */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">WebSocket Actions:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => joinChat(currentChatId)}
            disabled={!isConnected}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Join Chat
          </button>
          <button
            onClick={() => startTyping(currentChatId)}
            disabled={!isConnected}
            className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Start Typing
          </button>
          <button
            onClick={() => stopTyping(currentChatId)}
            disabled={!isConnected}
            className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            Stop Typing
          </button>
        </div>
      </div>
    </div>
  );
};