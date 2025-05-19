import {useEffect, useState} from "react"
import { Menu, X, ChevronDown } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar.tsx";
import { useNavigate } from "react-router";
import {UseAuth} from "../../auth/AuthenticationContext.tsx";
import { Footer } from "../../components/footer.tsx";
import type {Profile} from "../../type/profile.ts";
import API from "../../utils/API.ts";

export default function Home() {  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {user, logout} = UseAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate()
  const [bmi, setBmi] = useState(10);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
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

  const getProfile = async() => {
    const response = await API.get("/profile/me");
    if (response.status === 200) {
      setProfile(response.data.profile);
      setBmi(parseFloat(response.data.profile.weight) / Math.pow(parseFloat(response.data.profile.height), 2))
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
  }, [profile]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">FitFuel</h1>
        <button onClick={toggleSidebar} className="p-1">
          <Menu className="h-6 w-6 text-primary" />
        </button>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#2d6a4f] to-[#1b4332] text-background p-6 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold">FitFuel</h2>
              <button onClick={toggleSidebar}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-6 flex flex-col">
              <a href="/home" className="hover:underline text-destructive">
                Home
              </a>
              <a href="/recipe" className="hover:underline text-destructive">
                Recipe
              </a>
              <a href="/article" className="hover:underline text-destructive">
                Article
              </a>
              <Button onClick={logout}>
                Logout
              </Button>
            </nav>

            <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-background">
                    <Avatar className="h-full w-full">
                    <AvatarImage 
                        src="profile-picture/bbad49fe-231a-4b79-b2ad-d93533bcc9dd/9lskx5.jpg"
                        alt="Profile picture"
                        className="h-full w-full object-cover"
                    />
                    <AvatarFallback>profile image</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center">
                    <span className="font-medium">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pb-20">
        {/* Greeting */}
        <div className="mt-4 mb-6">
          <h2 className="text-lg font-medium">
            Good morning, <span className="text-[#95d5b2]">{user?.name}!</span>
          </h2>
        </div>

        {/* BMI Gauge */}
        <Card className="p-4 mb-6 shadow-sm">
          <div className="relative">
            <div className="flex justify-center mb-10">              
                <BMIGauge bmi={bmi} size={500}/>
            </div>
            <h3 className="text-center text-sm font-medium">Your BMI today!</h3>
            <div className="flex justify-center mt-2">
              <Button variant="outline" size="sm" className="text-xs rounded-full text-primary border-primary">
                Daily Charts Inside
              </Button>
            </div>
          </div>
        </Card>

        {/* Recipe of the day */}
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
                  onClick={() => navigate('/recipes')}
                >
                  See more!
                </Button>
              </div>
            </div>
          </div>
        </Card>        
        
        {/* Newest Articles */}
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
                        onClick={() => navigate('/articles')}
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
          
        {/* FAQ */}
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
        
        <Footer />
      </div>
    </main>
  )
}
