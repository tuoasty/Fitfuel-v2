import API from "../../utils/API.ts";
import {useEffect, useState} from "react";
import type {Recipe} from "../../type/recipe.ts";
import RecipeCard from "../../components/recipe-card.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import {toast} from "sonner";
import axios from "axios";
import {Input} from "../../components/ui/input.tsx";
import {Search, SlidersHorizontal} from "lucide-react";
import {Button} from "../../components/ui/button.tsx";
import {Tabs, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../components/ui/dialog.tsx";

const categories = ["All", "Breakfast", "Lunch", "Dinner"]
const calorieRanges = [
    {label: "<200 Cal", min: 0, max: 199},
    {label: "200-400 Cal", min: 200, max: 400},
    {label: "400-600 Cal", min: 401, max: 600},
    {label: ">600 Cal", min: 601, max: Number.POSITIVE_INFINITY},
    {label: "All", min: 0, max: Number.POSITIVE_INFINITY},
]

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [loading, setLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");

    const [minCalories, setMinCalories] = useState("")
    const [maxCalories, setMaxCalories] = useState("")

    const getRecipes = async () => {
        setLoading(true)
        try {
            const response = await API.get("recipe", {
                params: {
                    category:selectedCategory,
                    search:searchTerm,
                    minCalories,
                    maxCalories,
                }
            });
            setRecipes(response.data);
        } catch (error) {
            let errorMessage = "Error fetching recipes";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const handleCategoryChange = async (category: string) => {
        setSelectedCategory(category)
        await getRecipes()
    }

    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        getRecipes();
    }, [debouncedTerm]);

    const handleCalorieChange = (min: string, max: string) => {
        setMinCalories(min)
        setMaxCalories(max)
    }

    useEffect(() => {
        getRecipes();
    }, []);

    useEffect(() => {
        getRecipes();
    }, [selectedCategory, minCalories, maxCalories]);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-4 sm:py-8 bg-background min-h-screen">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                        Make your own food, <span className="text-secondary">Stay Fit</span>
                    </h1>
                </div>
                <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                        <Input
                            type="text"
                            placeholder="Search any recipe"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <SlidersHorizontal className="w-4 h-4"/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Calorie Filter</DialogTitle>
                                <DialogDescription>Filter recipes by calorie range</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm mb-1 block">Min Calories</label>
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={minCalories}
                                            onChange={(e) => handleCalorieChange(e.target.value, maxCalories)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm mb-1 block">Max Calories</label>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={maxCalories}
                                            onChange={(e) => handleCalorieChange(minCalories, e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm font-medium">Quick Select:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {calorieRanges.map((range) => (
                                            <Button key={range.label} onClick={() => {
                                                handleCalorieChange(range.min.toString(), range.max.toString())
                                            }} variant="outline" size="sm" className="text-xs">
                                                {range.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="hidden lg:flex items-center gap-2" disabled>
                        <SlidersHorizontal className="w-4 h-4"/>
                        Filter
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    <div className="flex-1">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="text-lg font-semibold mb-3">Category</h2>
                            <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
                                <TabsList className="grid w-full grid-cols-4 h-auto p-1">
                                    {categories.map((category) => (
                                        <TabsTrigger key={category} value={category}
                                                     className="text-xs sm:text-sm py-2 px-2 sm:px-4">
                                            {category}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>
                        {loading && (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                        {!loading && (
                            <p className="text-sm text-gray-600 mb-4">
                                {selectedCategory === "All" ? "All recipes" : `${selectedCategory} recipes`} ({recipes.length} found)
                            </p>
                        )}
                        <div
                            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    picture_url={recipe.picture_url}
                                    name={recipe.name}
                                    category={recipe.category}
                                    calories={recipe.calories}
                                    id={recipe.id}
                                />
                            ))}
                        </div>
                        {!loading && recipes.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No recipes found</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    {selectedCategory === "All"
                                        ? "No recipes available"
                                        : `No ${selectedCategory.toLowerCase()} recipes found`}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:block w-80">
                        <div className="bg-white rounded-lg p-6 shadow-sm border text-foreground">
                            <h3 className="text-lg font-semibold mb-4">Calorie Filter</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm mb-1 block">Min Calories</label>
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={minCalories}
                                            onChange={(e) => handleCalorieChange(e.target.value, maxCalories)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm mb-1 block">Max Calories</label>
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={maxCalories}
                                            onChange={(e) => handleCalorieChange(minCalories, e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {calorieRanges.map((range) => (
                                        <Button key={range.label} onClick={() => {
                                            handleCalorieChange(range.min.toString(), range.max.toString())
                                        }} variant="outline" size="sm"
                                                className="w-full justify-start hover:text-secondary">
                                            {range.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}