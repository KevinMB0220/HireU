"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isMe: boolean
}

interface Conversation {
  id: number
  name: string
  lastMessage: string
  timestamp: string
  unread: number
}

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(1)
  const [messageInput, setMessageInput] = useState("")

  const conversations: Conversation[] = [
    { id: 1, name: "Sarah Johnson", lastMessage: "Sounds good, let's schedule a call", timestamp: "2 min ago", unread: 2 },
    { id: 2, name: "Michael Chen", lastMessage: "I've sent the designs", timestamp: "1 hour ago", unread: 0 },
    { id: 3, name: "Emily Rodriguez", lastMessage: "Thanks for the feedback!", timestamp: "3 hours ago", unread: 1 },
  ]

  const messages: Message[] = [
    { id: 1, sender: "Sarah Johnson", content: "Hi! I saw your project posting", timestamp: "10:30 AM", isMe: false },
    { id: 2, sender: "Me", content: "Hello! Thanks for reaching out", timestamp: "10:32 AM", isMe: true },
    { id: 3, sender: "Sarah Johnson", content: "I'd love to discuss the requirements", timestamp: "10:33 AM", isMe: false },
    { id: 4, sender: "Me", content: "Sounds good, let's schedule a call", timestamp: "10:35 AM", isMe: true },
  ]

  const handleSend = () => {
    if (messageInput.trim()) {
      alert("Message sent! (Demo Mode)")
      setMessageInput("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-r from-[#002333] to-[#15949C] text-white py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="opacity-90">Connect with clients and freelancers</p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl py-8">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
              {/* Conversations List */}
              <div className="border-r border-gray-200">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <ScrollArea className="h-[540px]">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConv(conv.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b ${
                        selectedConv === conv.id ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {conv.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                            <span className="text-xs text-gray-500">{conv.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unread > 0 && (
                          <div className="w-5 h-5 bg-[#15949C] rounded-full flex items-center justify-center text-white text-xs">
                            {conv.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              {/* Messages Area */}
              <div className="md:col-span-2 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-full flex items-center justify-center text-white font-semibold">
                      S
                    </div>
                    <div>
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] ${msg.isMe ? "" : "flex gap-2"}`}>
                          {!msg.isMe && (
                            <div className="w-8 h-8 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                              S
                            </div>
                          )}
                          <div>
                            <div className={`p-3 rounded-lg ${
                              msg.isMe 
                                ? "bg-[#15949C] text-white" 
                                : "bg-gray-100 text-gray-900"
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-1">
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button 
                      onClick={handleSend}
                      className="bg-[#15949C] hover:bg-[#15949C]/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

