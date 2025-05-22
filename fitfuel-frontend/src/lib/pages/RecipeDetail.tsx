import {useParams} from "react-router";
import {useEffect} from "react";

export default function RecipeDetail(){
    const { recipeId } = useParams();
    useEffect(() => {
        console.log(recipeId);
    }, [recipeId]);

    return (
        <main>

        </main>
    )
}