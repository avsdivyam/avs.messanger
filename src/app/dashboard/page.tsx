"use client";

import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you doing?",
    timestamp: "2 min ago",
    unread: 2,
    avatar: "JD"
  },
  {
    id: 2,
    name: "Team Project",
    lastMessage: "Meeting at 3 PM today",
    timestamp: "1 hour ago",
    unread: 0,
    avatar: "TP"
  },
  {
    id: 3,
    name: "Sarah Wilson",
    lastMessage: "Thanks for the help!",
    timestamp: "3 hours ago",
    unread: 1,
    avatar: "SW"
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey, how are you doing?",
    timestamp: "10:30 AM",
    avatar: "JD"
  },
  {
    id: 2,
    sender: "You",
    content: "I'm doing great! How about you?",
    timestamp: "10:32 AM",
    avatar: "Y"
  },
  {
    id: 3,
    sender: "John Doe",
    content: "Pretty good, just working on some projects",
    timestamp: "10:35 AM",
    avatar: "JD"
  }
];

export default function DashboardPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Chat List Sidebar */}
      <div className="w-full sm:w-1/3 border-r border-white/10 flex flex-col">
        <div className="p-3 sm:p-4 border-b border-white/10">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id ? "bg-blue-50 border-r-2 border-blue-500" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {chat.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-300">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 truncate mt-1">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs text-white">{chat.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="hidden sm:flex flex-1 flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-lg">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm sm:text-base">{selectedChat.name}</h3>
                  <p className="text-xs sm:text-sm text-green-400">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender !== "You" && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium shadow-lg flex-shrink-0">
                      {message.avatar}
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-2xl ${
                      message.sender === "You"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md shadow-lg"
                        : "bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-bl-md"
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "You" ? "text-blue-100" : "text-gray-300"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                  {message.sender === "You" && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium shadow-lg flex-shrink-0">
                      {message.avatar}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 text-sm backdrop-blur-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl transform hover:scale-105 text-sm font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                <span className="text-xl sm:text-2xl">💬</span>
              </div>
              <p className="text-sm sm:text-base">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}