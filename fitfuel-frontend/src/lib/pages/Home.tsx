import {useEffect, useState} from "react"
import {Button} from "../../components/ui/button.tsx";
import {Card} from "../../components/ui/card.tsx";
import {BMIGauge} from "../../components/bmi-gauge.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion.tsx"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "../../components/ui/carousel.tsx"
import article1 from "../../assets/register_image_3.png"
import article2 from "../../assets/landing_background_2.png";
import article3 from "../../assets/landing_image.png"
import {useNavigate} from "react-router";
import {UseAuth} from "../../auth/AuthenticationContext.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import type {Recipe} from "../../type/recipe.ts";
import API from "../../utils/API.ts";
import axios from "axios";
import {toast} from "sonner";

export default function Home() {
    const {user, profile} = UseAuth();
    const navigate = useNavigate()
    const [bmi, setBmi] = useState(10);
    const faqItems = [
        {
            id: "item-1",
            question: "Can I track my progress?",
            answer:
                "Yes! FitFuel allows you to log your meals, monitor calorie intake, track weight changes, and visualize progress over time.",
        },
        {
            id: "item-2",
            question: "How do I contact FitFuel support?",
            answer: "You can reach us through the Help section in the app or email us aat support@fitfuelapp.com.",
        },
        {
            id: "item-3",
            question: "What is FitFuel?",
            answer:
                "FitFuel is a smart meal planner application that creates personalized meal plans based on your BMI, dietary goals, and lifestyle preferences.",
        },
        {
            id: "item-4",
            question: "How does FitFuel use my BMI?",
            answer:
                "FitFuel uses your Body Mass Index (BMI) to determine your health. This helps guide the app in recommending a calorie-appropriate and nutrient-balanced meal plan tailored to your needs.",
        },
        {
            id: "item-5",
            question: "What kind of meal plans does FitFuel provide?",
            answer:
                "FitFuel offers: Calorie-specific daily meal plans, Macronutrient-balanced recipes, Wellness article.",
        },
    ]

    const articles = [
        {
            id: 1,
            title: "What are the benefits of eating healthy?",
            image: article1,
            link: "articles/"
        },
        {
            id: 2,
            title: 'Parkinson\'s disease prevention may begin "at the dinner table"',
            image: article2,
        },
        {
            id: 3,
            title: 'The 7 Best Weight Loss Meal Plans for Women',
            image: article3,
        },
    ]

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    useEffect(() => {
        getRecipe();
    }, []);

    const getRecipe = async () => {
        try {
            const response = await API.get("recipe/random")
            console.log(response);
            if (response.status == 200) {
                setRecipe(response.data[0]);
            }
        } catch (error) {
            let errorMessage = "Error getting daily recipe";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        if (!profile || !profile.height || !profile.weight) return;
        const finalBmi = profile.weight / Math.pow(profile.height / 100, 2)
        setBmi(finalBmi);
    }, [profile]);

    return (
        <MainLayout>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="mt-4 mb-6">
                    <h2 className="text-lg font-medium">
                        Good morning, <span className="text-[#95d5b2]">{user?.name}!</span>
                    </h2>
                </div>
                <Card className="p-4 sm:p-6 mb-6 shadow-sm">
                    <div className="relative">
                        <div className="flex justify-center mb-24">
                            <BMIGauge bmi={bmi} size={Math.min(500, typeof window !== 'undefined' ? window.innerWidth - 100 : 400)} />
                        </div>
                        <h3 className="text-center text-sm font-medium">Your BMI today!</h3>
                        <div className="flex justify-center mt-2">
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => navigate('/daily-calorie-intake')}
                                className="text-xs rounded-full text-white border-primary"
                            >
                                Daily Calorie Intake
                            </Button>
                        </div>
                    </div>
                </Card>
                {recipe && (
                    <Card className="mb-6 bg-cover bg-center bg-no-repeat bg-gradient-to-b pt-0 from-secondary to-foreground bg-blend-overlay">
                        <div className="relative mt-6" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                            <div className="absolute -top-2 -right-2 sm:-right-4 bg-destructive text-background px-3 py-1 sm:px-4 sm:py-2 rounded-lg z-10 text-sm font-medium shadow-lg transform hover:scale-105 transition-transform duration-200 border-2 border-destructive">
                                Recipe of the day!
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
                )}
                {recipe && (
                    <div className="text-center mb-6">
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 items-center">
                            <p className="text-gray-600 text-sm">Curious about other healthy recipes?</p>
                            <Button
                                className="bg-secondary hover:bg-teal-600 text-white"
                                onClick={() => navigate("/recipes")}
                            >
                                See more!
                            </Button>
                        </div>
                    </div>
                )}
                <Card className="mb-6 bg-secondary-foreground p-4 sm:p-6">
                    <h3 className="font-bold text-white mb-6 text-xl sm:text-2xl">Newest Articles</h3>
                    <div className="relative">
                        <Carousel className="w-full">
                            <CarouselContent className="-ml-2 sm:-ml-4">
                                {articles.map((article) => (
                                    <CarouselItem key={article.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                        <div className="bg-background rounded-lg overflow-hidden shadow-sm h-full">
                                            <div className="relative h-48 sm:h-64">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4 sm:p-6">
                                                <p className="text-sm font-medium mb-4 line-clamp-2">
                                                    {article.title}
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full text-xs hover:bg-secondary-foreground/10"
                                                >
                                                    Read More
                                                </Button>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                                <CarouselItem className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                    <div className="bg-background rounded-lg overflow-hidden shadow-sm h-full flex items-center justify-center min-h-[280px] sm:min-h-[320px]">
                                        <div className="p-4 sm:p-6 text-center">
                                            <h4 className="font-semibold text-base sm:text-lg mb-4">
                                                Want to see more articles?
                                            </h4>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="text-primary border-primary hover:bg-primary/10"
                                                onClick={() => navigate('/article')}
                                            >
                                                View All Articles
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-9 bg-background/80" variant="destructive"/>
                            <CarouselNext className="hidden sm:flex -right-4 lg:-right-9 bg-background/80" variant="destructive"/>
                        </Carousel>
                    </div>
                </Card>
                <div className="mb-6">
                    <h3 className="font-bold text-xl sm:text-2xl mb-6 text-center">FAQ</h3>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item) => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger className="text-primary text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-secondary">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </MainLayout>
    )
}