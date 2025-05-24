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
import recipe from "../../assets/register_image_2.png"
import article1 from "../../assets/register_image_3.png"
import article2 from "../../assets/landing_background_2.png";
import article3 from "../../assets/landing_image.png"
import { useNavigate } from "react-router";
import {UseAuth} from "../../auth/AuthenticationContext.tsx";
import MainLayout from "../layout/MainLayout.tsx";

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

  const recipeOfTheDay = {
    title: "Quinoa Salad",
    image: recipe,
    description: "Curious about other healthy recipes?",
  }

  useEffect(() => {
    if (!profile || !profile.height || !profile.weight) return;
    const finalBmi = profile.weight / Math.pow(profile.height/100, 2)
    setBmi(finalBmi);
  }, [profile]);

  return (
    <MainLayout>
      <div className="px-4 pb-20">
        <div className="mt-4 mb-6">
          <h2 className="text-lg font-medium">
            Good morning, <span className="text-[#95d5b2]">{user?.name}!</span>
          </h2>
        </div>
        <Card className="p-4 mb-6 shadow-sm">
          <div className="relative">
            <div className="flex justify-center mb-25">              
                <BMIGauge bmi={bmi} size={500}/>
            </div>
            <h3 className="text-center text-sm font-medium">Your BMI today!</h3>
            <div className="flex justify-center mt-2">
              <Button 
              variant="default" size="sm" 
              onClick={() => navigate('/daily-calorie-intake')}
              className="text-xs rounded-full 
              text-white border-primary">
                Daily Calorie Intake
              </Button>
            </div>
          </div>
        </Card>
        <Card className="mb-6 bg-accent">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute top-0 right-0 bg-[#2d6a4f] text-background px-3 py-1 rounded-bl-lg z-10 text-sm">
              Recipe of the day!
            </div>            <div className="flex flex-row h-32">
            <div className="relative w-1/3">
              <img src={recipeOfTheDay.image} alt="recipe photo" className="object-cover h-full w-full" />
            </div>
            <div className="w-2/3 p-3 text-primary flex flex-col">
              <h3 className="font-bold text-lg mb-2">{recipeOfTheDay.title}</h3>
              <p className="text-xs mb-2">Curious about other healthy recipes?</p>
              <Button
                  variant="outline"
                  size="sm"
                  className="self-end text-primary border-primary hover:bg-primary/10 text-xs"
                  onClick={() => navigate('/recipe')}
              >
                See more!
              </Button>
            </div>
          </div>
          </div>
        </Card>
        <Card className="mb-6 bg-secondary-foreground p-6">
          <h3 className="font-bold text-white mb-6 text-xxl">Newest Articles</h3>
          <div className="relative px-5">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {articles.map((article) => (
                    <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="bg-background rounded-lg overflow-hidden shadow-sm h-full">
                        <div className="relative h-64">
                          <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <p className="text-sm font-medium mb-4 line-clamp-2">{article.title}</p>
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
                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-background rounded-lg overflow-hidden shadow-sm h-full flex items-center justify-center">
                    <div className="p-6 text-center">
                      <h4 className="font-semibold text-lg mb-4">Want to see more articles?</h4>
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
              <CarouselPrevious className="-left-9 bg-background/80" variant="destructive" />
              <CarouselNext className="-right-9 bg-background/80" variant="destructive" />
            </Carousel>
          </div>
        </Card>
        <div className="mb-6">
          <h3 className="font-bold text-xxl mb-3 text-center">FAQ</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-primary">
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
