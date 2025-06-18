"use client";

import { useState } from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  status: "online" | "offline" | "away";
  avatar: string;
  lastSeen?: string;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "online",
    avatar: "JD"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    status: "away",
    avatar: "SW",
    lastSeen: "2 hours ago"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    status: "offline",
    avatar: "MJ",
    lastSeen: "Yesterday"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "online",
    avatar: "ED"
  }
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: Contact["status"]) => {
    switch (status) {
      case "online":
        return "Online";
      case "away":
        return "Away";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-black mb-2">Contacts</h1>
        <p className="text-sm sm:text-base text-gray-300">Manage your contacts and see who's online</p>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20">
        {/* Search and Actions */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center sm:justify-between">
            <div className="flex-1 max-w-full sm:max-w-md relative">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 text-sm sm:text-base backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base whitespace-nowrap font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
              Add Contact
            </button>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base shadow-lg">
                      {contact.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 ${getStatusColor(
                        contact.status
                      )} rounded-full border-2 border-slate-900`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate text-sm sm:text-base">{contact.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 truncate">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${getStatusColor(contact.status)} rounded-full flex-shrink-0`}></div>
                    <span className="text-xs sm:text-sm text-gray-300 truncate">
                      {getStatusText(contact.status)}
                      {contact.lastSeen && contact.status !== "online" && (
                        <span className="text-gray-400 hidden sm:inline"> • {contact.lastSeen}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    <button className="p-1 text-gray-300 hover:text-blue-400 transition-colors">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-300 hover:text-green-400 transition-colors">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 sm:py-12 col-span-full">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/20">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm sm:text-base">No contacts found</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details Modal (simplified) */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-white">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-300 hover:text-white p-1 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-lg sm:text-xl mx-auto mb-3 shadow-lg">
                {selectedContact.avatar}
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-white">{selectedContact.name}</h3>
              <p className="text-sm sm:text-base text-gray-300">{selectedContact.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className={`w-2 h-2 ${getStatusColor(selectedContact.status)} rounded-full`}></div>
                <span className="text-xs sm:text-sm text-gray-300">{getStatusText(selectedContact.status)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                Send Message
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}