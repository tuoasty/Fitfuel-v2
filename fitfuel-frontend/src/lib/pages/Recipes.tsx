import API from "../../utils/API.ts";
import { useEffect, useState } from "react";
import type {Recipe} from "../../type/recipe.ts";

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

        </main>
    )
}