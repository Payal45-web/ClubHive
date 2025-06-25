"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "image" | "system"
}

interface Chat {
  id: string
  name: string
  type: "direct" | "group" | "venue"
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  isOnline?: boolean
}

interface ChatContextType {
  chats: Chat[]
  activeChat: Chat | null
  messages: Record<string, Message[]>
  setActiveChat: (chat: Chat | null) => void
  sendMessage: (chatId: string, content: string) => void
  markAsRead: (chatId: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "Maya Patel",
      type: "direct",
      participants: ["1", "2"],
      unreadCount: 2,
      isOnline: true,
      lastMessage: {
        id: "1",
        senderId: "2",
        senderName: "Maya Patel",
        content: "Hey! Are you going to Neon Pulse tonight?",
        timestamp: new Date(Date.now() - 300000),
        type: "text",
      },
    },
    {
      id: "2",
      name: "Weekend Warriors",
      type: "group",
      participants: ["1", "2", "3", "4"],
      unreadCount: 5,
      lastMessage: {
        id: "2",
        senderId: "3",
        senderName: "Jordan Kim",
        content: "Who's ready for tonight? 🎉",
        timestamp: new Date(Date.now() - 600000),
        type: "text",
      },
    },
  ])

  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        senderId: "2",
        senderName: "Maya Patel",
        content: "Hey! Are you going to Neon Pulse tonight?",
        timestamp: new Date(Date.now() - 300000),
        type: "text",
      },
      {
        id: "2",
        senderId: "1",
        senderName: "You",
        content: "Thinking about it! What time are you heading there?",
        timestamp: new Date(Date.now() - 240000),
        type: "text",
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "3",
        senderName: "Jordan Kim",
        content: "Who's ready for tonight? 🎉",
        timestamp: new Date(Date.now() - 600000),
        type: "text",
      },
      {
        id: "2",
        senderId: "4",
        senderName: "Sam Rodriguez",
        content: "Count me in! What's the plan?",
        timestamp: new Date(Date.now() - 540000),
        type: "text",
      },
    ],
  })

  const sendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: "1",
      senderName: "You",
      content,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }))

    // Update last message in chat
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: newMessage,
            }
          : chat,
      ),
    )
  }

  const markAsRead = (chatId: string) => {
    setChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, unreadCount: 0 } : chat)))
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        messages,
        setActiveChat,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
