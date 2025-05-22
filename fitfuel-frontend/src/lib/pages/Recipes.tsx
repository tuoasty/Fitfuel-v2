import API from "../../utils/API.ts";
import { useEffect, useState } from "react";
import type {Recipe} from "../../type/recipe.ts";
import RecipeCard from "../../components/recipe-card.tsx";

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
        <main>
            {recipes.map((recipe:Recipe, i) => (
                <RecipeCard key={i} picture_url={recipe.picture_url} name={recipe.name} category={recipe.category} calories={recipe.calories}/>
            ))}
        </main>
    )
}