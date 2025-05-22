import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Recipe} from "../../type/recipe.ts";
import API from "../../utils/API.ts";
import {ArrowLeft, Clock} from "lucide-react";
import {Button} from "react-day-picker";

export default function RecipeDetail(){
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    useEffect(() => {
        getRecipe();
    }, [recipeId]);

    const getRecipe = async () => {
        const response = await API.get(`recipe/${recipeId}`)
        if(response.status == 200) {
            setRecipe(response.data);
            return
        } else {
            navigate("/recipe")
            return
        }
    }

    if (!recipe) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="absolute top-4 left-4 z-10">
                <Button onClick={() => navigate("/recipe")} className="bg-white rounded-full p-2 shadow-md">
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                </Button>
            </div>

            {/* Recipe image */}
            <div className="relative w-full h-[300px] sm:h-[400px]">
                <img src={recipe.picture_url || "/placeholder.svg"} alt={recipe.name} className="w-full h-full object-cover" />
            </div>

            {/* Recipe content */}
            <div className="px-4 py-6 sm:px-8 max-w-3xl mx-auto">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-teal-800">{recipe.name}</h1>
                    <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{recipe.time}</span>
                    </div>
                </div>

                <p className="text-gray-600 mb-6">{recipe.description}</p>

                {/* Nutrition info */}
                <div className="flex justify-between mb-8 border-y border-gray-200 py-4">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                            <svg
                                className="w-5 h-5 text-orange-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="font-semibold text-teal-800">{recipe.calories}</span>
                        <span className="text-xs text-gray-500">Calories</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="font-semibold text-teal-800">{recipe.protein}</span>
                        <span className="text-xs text-gray-500">Protein</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                            <svg
                                className="w-5 h-5 text-purple-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="font-semibold text-teal-800">{recipe.carbs}</span>
                        <span className="text-xs text-gray-500">Carbs</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-1">
                            <svg
                                className="w-5 h-5 text-yellow-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="font-semibold text-teal-800">{recipe.fat}</span>
                        <span className="text-xs text-gray-500">Fat</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                            <svg
                                className="w-5 h-5 text-green-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="font-semibold text-teal-800">{recipe.fiber}</span>
                        <span className="text-xs text-gray-500">Fiber</span>
                    </div>
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-teal-800 mb-4">Ingredients</h2>
                    <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3"></div>
                                <span>{ingredient}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Directions */}
                <div>
                    <h2 className="text-xl font-bold text-teal-800 mb-4">Directions</h2>
                    <ol className="space-y-4">
                        {recipe.directions.map((step, index) => (
                            <li key={index} className="flex items-start">
                                <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                                    {index + 1}
                                </div>
                                <p>{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}