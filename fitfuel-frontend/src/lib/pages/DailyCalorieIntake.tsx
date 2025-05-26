import { useEffect, useState } from "react";
import { BMIGauge } from "../../components/bmi-gauge";
import { Card, CardContent } from "../../components/ui/card";
import MainLayout from "../layout/MainLayout";
import { UseAuth } from "../../auth/AuthenticationContext";
import { Progress } from "../../components/ui/progress";
import { getBMICategory, getBMIColor } from "../../utils/bmi-utils";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import type { Recipe } from "../../type/recipe";
import API from "../../utils/API";

export default function DailyCalorieIntake() {
    const {profile} = UseAuth();
    const [bmi, setBmi] = useState(10);
    const [dailyCalories, setDailyCalories] = useState(2100)
    const navigate = useNavigate()
    const [recommendedRecipes, setRecommendedRecipes] = useState<{
        breakfast?: Recipe
        lunch?: Recipe
        dinner?: Recipe
        snack?: Recipe
      }>({})

    useEffect(() => {
        if (!profile || !profile.height || !profile.weight) return;
        const finalBmi = profile.weight / Math.pow(profile.height/100, 2)
        setBmi(finalBmi);
    }, [profile]);

    useEffect(() => {
        const getRecommendedRecipes = async () => {
            try {
            const response = await API.get("recipe")
            const recipes: Recipe[] = response.data

            const breakfast = recipes.find(
                (recipe) => recipe.category.toLowerCase().includes("breakfast") 
                || recipe.name.toLowerCase().includes("breakfast"),
            )
            const lunch = recipes.find(
                (recipe) => recipe.category.toLowerCase().includes("lunch") 
                || recipe.name.toLowerCase().includes("lunch"),
            )
            const dinner = recipes.find(
                (recipe) => recipe.category.toLowerCase().includes("dinner") 
                || recipe.name.toLowerCase().includes("dinner"),
            )
            const snack = recipes.find(
                (recipe) => recipe.category.toLowerCase().includes("snack") 
                || recipe.name.toLowerCase().includes("snack"),
            )

            setRecommendedRecipes({
                breakfast: breakfast || recipes[0],
                lunch: lunch || recipes[1],
                dinner: dinner || recipes[2],
                snack: snack || recipes[3],
            })
            } catch (error) {
            console.error("Error fetching recipes:", error)
            }
        }

        getRecommendedRecipes()
    }, [])

    const meals = [
        { name: "Breakfast", calories: 525, maxCalories: 600 },
        { name: "Lunch", calories: 735, maxCalories: 800 },
        { name: "Dinner", calories: 630, maxCalories: 700 },
        { name: "Snack", calories: 210, maxCalories: 300 },
    ]

    const getMealBadgeText = (mealType: string) => {
        switch (mealType.toLowerCase()) {
            case "breakfast":
                return "Best for Breakfast!"
            case "lunch":
                return "Best for Lunch!"
            case "dinner":
                return "Best for Dinner!"
            case "snack":
                return "Best for Snack!"
            default:
                return "Recommended!"
        }
    }

    const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6 bg-background min-h-screen">
                <h1 className="text-2xl font-bold text-foreground mb-6">Daily Calorie Intake</h1>
                <Card className="mb-6 bg-muted/30">
                    <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                        <BMIGauge bmi={bmi} size={500} />
                    </div>
                    <h3 className="text-center text-2xl text-muted-foreground mt-25">
                        What is Your BMI Level?
                        </h3>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="text-white" style={{ backgroundColor: getBMIColor(bmi) }}>
                        <CardContent className="p-6 text-center">
                            <p className="text-sm font-medium mb-2">Your BMI:</p>
                            <p className="text-3xl font-bold mb-1">{bmi.toFixed(1)}</p>
                            <p className="text-l opacity-90">{getBMICategory(bmi)}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-accent">
                    <CardContent className="p-6 text-center">
                        <div className="mb-2">
                        <svg className="w-8 h-8 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        </div>
                        <p className="text-3xl font-bold text-primary mb-1">{dailyCalories}</p>
                        <p className="text-sm text-primary">kcal/day</p>
                    </CardContent>
                    </Card>
                </div>
                <Card className="bg-accent mb-6">
                    <CardContent className="p-6">
                    <div className="space-y-4">
                        {meals.map((meal, _) => (
                        <div key={meal.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-primary">{meal.name}</h3>
                            <span className="text-sm text-primary font-medium">{meal.calories} kcal</span>
                            </div>
                            <Progress value={(meal.calories / meal.maxCalories) * 100} className="h-2" />
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-primary">Today's Meal Plan</h2>
                            <span className="text-sm text-muted-foreground">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                            </span>
                        </div>
                        <div className="space-y-4">
                            {mealTypes.map((mealType) => {
                                const recipe = recommendedRecipes[mealType]
                                if (!recipe) return null

                                return (
                                    <Card className="mb-6 bg-cover bg-center bg-no-repeat bg-gradient-to-b pt-0 from-secondary to-foreground bg-blend-overlay">
                                        <div className="relative mt-6" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                                            <div className="absolute -top-2 -right-2 sm:-right-4 bg-destructive text-background px-3 py-1 sm:px-4 sm:py-2 rounded-lg z-10 text-sm font-medium shadow-lg transform hover:scale-105 transition-transform duration-200 border-2 border-destructive">
                                                {getMealBadgeText(mealType)}
                                            </div>
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="w-full sm:w-2/5 h-48 sm:h-56">
                                                    <img
                                                        src={recipe.picture_url || "/placeholder.svg"}
                                                        alt="recipe photo"
                                                        className="object-cover h-full w-full"
                                                    />
                                                </div>
                                                <div className="w-full sm:w-3/5 p-4 sm:p-6 text-white flex flex-col justify-center">
                                                    <h3 className="font-bold text-xl sm:text-2xl mb-2 text-white">
                                                        {recipe.name}
                                                    </h3>
                                                    <p className="text-gray-300 text-sm sm:text-base mb-3">
                                                        {recipe.calories} calories
                                                    </p>
                                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                                                        {recipe.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                        <div className="mt-6 flex justify-between items-center border-t pt-4">
                            <p className="text-sm text-muted-foreground">
                                Discover more healthy recipes for your meal plan
                            </p>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => navigate("/recipe")}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                See More
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}