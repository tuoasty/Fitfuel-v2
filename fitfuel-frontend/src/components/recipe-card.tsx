import { CiHeart } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import { useState } from "react";

interface Props {
    picture_url:string
    name:string
    category:string
    calories:number
}

function toPascalCase(category:string){
    return category.charAt(0) + category.slice(1).toLowerCase();
}

export default function RecipeCard(p:Props) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <div className="w-full max-w-[280px] bg-background rounded-xl overflow-hidden shadow-sm">
            <div className="relative">
                <img src={p.picture_url || "/placeholder.svg"} alt={p.name} className="w-full aspect-square object-cover" />
                <div className="absolute bottom-2 right-2 bg-destructive text-background rounded-full px-2 gap-1 py-1 text-xs font-medium flex items-center">
                    <FaFire/>
                    {p.calories} cal
                </div>
            </div>
            <div className="p-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-lg font-semibold text-teal-800">{p.name}</h1>
                        <h2 className="text-sm text-teal-600/70">{toPascalCase(p.category)}</h2>
                    </div>
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="mt-1"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <CiHeart/>
                    </button>
                </div>
            </div>
        </div>
    )
}