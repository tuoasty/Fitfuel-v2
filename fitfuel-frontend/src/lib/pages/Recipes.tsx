import API from "../../utils/API.ts";
import { useEffect } from "react";

export default function Recipes(){

    const getRecipes = async () => {
        const response = await API.get("recipe");
        console.log(response);
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <main>

        </main>
    )
}