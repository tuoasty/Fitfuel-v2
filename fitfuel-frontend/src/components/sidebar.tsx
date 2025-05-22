import {ChevronDown, X} from "lucide-react";
import {Button} from "./ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar.tsx";
import {useNavigate} from "react-router";
import {UseAuth} from "../auth/AuthenticationContext.tsx";

interface Props {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar(p: Props) {
    const {logout, user, profile} = UseAuth();
    const navigate = useNavigate();
    if (!p.isSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#2d6a4f] to-[#1b4332] text-background p-6 transform transition-transform duration-300">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-bold">FitFuel</h2>
                    <button onClick={p.toggleSidebar}>
                        <X className="h-6 w-6"/>
                    </button>
                </div>

                <nav className="space-y-6 flex flex-col">
                    <Button onClick={() => navigate("/home")} className="hover:underline text-destructive">
                        Home
                    </Button>
                    <Button onClick={() => navigate("/recipe")} className="hover:underline text-destructive">
                        Recipe
                    </Button>
                    <Button onClick={() => navigate("/article")} className="hover:underline text-destructive">
                        Article
                    </Button>
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
                        <ChevronDown className="h-4 w-4 ml-1"/>
                    </div>
                </div>
            </div>
        </div>
    )
}