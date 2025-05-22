import {Menu} from "lucide-react";

interface Props {
    toggleSidebar: () => void;
}

export default function FitfuelHeader(p:Props){
    return (
        <header className="sticky top-0 z-50 bg-background p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold text-primary">FitFuel</h1>
            <button onClick={p.toggleSidebar} className="p-1 cursor-pointer">
                <Menu className="h-6 w-6 text-primary" />
            </button>
        </header>
    )
}