import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Recipe} from "../../type/recipe.ts";
import API from "../../utils/API.ts";

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
            console.log(response.data)
            setRecipe(response.data);
            return
        } else {
            navigate("/recipe")
            return
        }
    }

    useEffect(() => {

    }, []);

    return (
        <main>

        </main>
    )
}