import FitfuelHeader from "../../components/header.tsx";
import Sidebar from "../../components/sidebar.tsx";
import {useState} from "react";
import {Footer} from "../../components/footer.tsx";

interface Props {
    children?:React.ReactNode
}

export default function MainLayout(p:Props) {
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
        </div>
    )
}