import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { UseAuth } from "../auth/AuthenticationContext";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const {user, logout} = UseAuth();
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    <main>
        <div>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-primary">FitFuel</h1>
                <button onClick={toggleSidebar} className="p-1">
                <Menu className="h-6 w-6 text-primary" />
                </button>
            </header>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50">
                <div className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#2d6a4f] to-[#1b4332] text-background p-6 transform transition-transform duration-300">
                    <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-bold">FitFuel</h2>
                    <button onClick={toggleSidebar}>
                        <X className="h-6 w-6" />
                    </button>
                    </div>

                    <nav className="space-y-6 flex flex-col">
                    <a href="/home" className="hover:underline text-destructive">
                        Home
                    </a>
                    <a href="/recipe" className="hover:underline text-destructive">
                        Recipe
                    </a>
                    <a href="/article" className="hover:underline text-destructive">
                        Article
                    </a>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                    </nav>

                    <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-background">
                            <Avatar className="h-full w-full">
                            <AvatarImage
                                src={profile?.picture_url}
                                alt="Profile picture"
                                className="h-full w-full object-cover"
                            />
                            <AvatarFallback>profile image</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium">{user?.name}</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    </main>
}