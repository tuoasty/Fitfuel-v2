import type React from "react"
import { useState } from "react"
import { ArrowLeft, Mic, Send } from "lucide-react"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input.tsx"

interface Message {
    id: string
    text: string
    isBot: boolean
    timestamp: Date
}

interface Props {
    onBack?: () => void
}

export default function Chat({ onBack }: Props) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello! I'm FitBot, your nutrition assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date(),
        },
        {
            id: "2",
            text: "I can help you with meal planning, nutrition advice, and healthy recipes!",
            isBot: true,
            timestamp: new Date(),
        },
    ])

    const [inputValue, setInputValue] = useState("")

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputValue.trim(),
                isBot: false,
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, newMessage])
            setInputValue("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage()
        }
    }

    const formatDate = (date: Date) => {
        const today = new Date()
        const messageDate = new Date(date)

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today"
        }

        return messageDate.toLocaleDateString()
    }

    const shouldShowDateSeparator = (currentMessage: Message, previousMessage?: Message) => {
        if (!previousMessage) return true

        const currentDate = new Date(currentMessage.timestamp).toDateString()
        const previousDate = new Date(previousMessage.timestamp).toDateString()

        return currentDate !== previousDate
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-4xl bg-background shadow-xl rounded-none sm:rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-background">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="text-foreground hover:bg-gray-100 sm:h-10 sm:w-10"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">FitBot</h1>
                    <div className="w-10 sm:w-10" />
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                    {messages.map((message, index) => (
                        <div key={message.id}>
                            {/* Date Separator */}
                            {shouldShowDateSeparator(message, messages[index - 1]) && (
                                <div className="flex justify-center mb-4 sm:mb-6">
                  <span className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium">
                    {formatDate(message.timestamp)}
                  </span>
                                </div>
                            )}
                            <div className={`flex ${!message.isBot ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-sm ${
                                        !message.isBot
                                            ? "bg-secondary text-foreground rounded-br-md"
                                            : "bg-gray-200 text-gray-800 rounded-bl-md"
                                    }`}
                                >
                                    <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-secondary p-4 sm:p-6 border-t border-gray-100">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="flex-1 relative">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Message"
                                className="bg-background border-none rounded-full px-4 py-3 sm:px-6 sm:py-4 pr-12 sm:pr-14 text-foreground placeholder:text-gray-500 focus:ring-2 focus:ring-foreground/20 text-sm sm:text-base"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-foreground h-8 w-8 sm:h-10 sm:w-10"
                            >
                                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </div>

                        <Button
                            onClick={handleSendMessage}
                            size="icon"
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
