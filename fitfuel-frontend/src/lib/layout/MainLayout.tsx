import FitfuelHeader from "../../components/header.tsx";
import Sidebar from "../../components/sidebar.tsx";
import {useState} from "react";
import {Footer} from "../../components/footer.tsx";
import { LuBotMessageSquare } from "react-icons/lu";
import { useNavigate } from "react-router"

interface Props {
    children?:React.ReactNode
}

export default function MainLayout(p:Props) {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    return (
        <div className="min-h-screen bg-background text-foreground">
            <FitfuelHeader toggleSidebar={toggleSidebar} />
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            {p.children}
            <Footer />
            <div onClick={() => navigate("/chat")} className="fixed bottom-8 right-8 w-20 h-20 bg-foreground rounded-full flex flex-col justify-center items-center">
                <span className="text-background text-xs">FIT BOT</span>
                <LuBotMessageSquare className="text-background text-4xl"/>
            </div>
        </div>
    )
}