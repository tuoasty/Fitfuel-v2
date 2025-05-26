import { ChevronDown, X } from "lucide-react"
import { Button } from "./ui/button.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx"
import { useNavigate } from "react-router"
import { UseAuth } from "../auth/AuthenticationContext.tsx"

interface Props {
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

export default function Sidebar(p: Props) {
    const { logout, user, profile } = UseAuth()
    const navigate = useNavigate()
    if (!p.isSidebarOpen) return null

    return (
        <div className="fixed inset-0 z-50">
            <div className="hidden sm:block fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={p.toggleSidebar} />
            <div className="fixed right-0 top-0 h-full w-full sm:w-80 bg-gradient-to-b from-foreground to-foreground/95 text-background shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
                <div className="flex justify-between items-center p-8 pb-12 border-b border-background/10">
                    <div className="text-center flex-1">
                        <h2 className="text-3xl font-bold text-background tracking-wide">FitFuel</h2>
                        <p className="text-background/80 text-sm mt-1">Your nutrition companion</p>
                    </div>
                    <Button
                        onClick={p.toggleSidebar}
                        variant="ghost"
                        size="icon"
                        className="text-background hover:bg-background/20 h-10 w-10 rounded-full transition-all duration-200"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-1 px-8 py-8">
                    <div className="space-y-4">
                        <Button
                            onClick={() => navigate("/home")}
                            variant="ghost"
                            className="w-full text-background hover:bg-background/15 font-medium text-xl py-6 px-6 h-auto rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Home
                        </Button>

                        <Button
                            onClick={() => navigate("/recipe")}
                            variant="ghost"
                            className="w-full text-background hover:bg-background/15 font-medium text-xl py-6 px-6 h-auto rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Recipe
                        </Button>

                        <Button
                            onClick={() => navigate("/article")}
                            variant="ghost"
                            className="w-full text-background hover:bg-background/15 font-medium text-xl py-6 px-6 h-auto rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Article
                        </Button>
                    </div>
                    <div className="mt-12 pt-8 border-t border-background/10">
                        <Button
                            onClick={logout}
                            variant="outline"
                            className="w-full text-background border-background/30 hover:bg-background/15 hover:border-background/50 font-medium text-lg py-5 px-6 h-auto rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Logout
                        </Button>
                    </div>
                </nav>
                <div className="p-8 pt-4 border-t border-background/10 bg-gradient-to-t from-black/10 to-transparent">
                    <div className="flex items-center justify-center space-x-4 bg-background/10 rounded-2xl p-4 backdrop-blur-sm">
                        <Avatar className="h-14 w-14 ring-2 ring-background/30 shadow-lg">
                            <AvatarImage
                                src={profile?.picture_url || "/placeholder.svg"}
                                alt="Profile picture"
                                className="h-full w-full object-cover"
                            />
                            <AvatarFallback className="bg-background text-foreground font-bold text-lg">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center flex-1 justify-center">
                            <span className="font-semibold text-background text-lg truncate">{user?.name || "User"}</span>
                            <ChevronDown className="h-5 w-5 ml-2 text-background/80 transition-transform duration-200 hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
