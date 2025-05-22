import API from "../../utils/API.ts";
import { useEffect, useState } from "react";
import type {Recipe} from "../../type/recipe.ts";
import RecipeCard from "../../components/recipe-card.tsx";
import MainLayout from "../layout/MainLayout.tsx";

export default function Recipes(){
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getRecipes = async () => {
        const response = await API.get("recipe");
        setRecipes(response.data);
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8 bg-background min-h-screen">
                <h1 className="text-2xl font-bold text-foreground mb-6">Recipes</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {recipes.map((recipe, i) => (
                        <RecipeCard
                            key={i}
                            picture_url={recipe.picture_url}
                            name={recipe.name}
                            category={recipe.category}
                            calories={recipe.calories}
                            id={recipe.id}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}