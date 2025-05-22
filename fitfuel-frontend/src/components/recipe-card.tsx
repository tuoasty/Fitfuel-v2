import { CiHeart } from "react-icons/ci";
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
        <div className="w-full max-w-[280px] bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative">
                <img src={p.picture_url || "/placeholder.svg"} alt={p.name} className="w-full aspect-square object-cover" />
                <div className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                            fill="currentColor"
                        />
                    </svg>
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