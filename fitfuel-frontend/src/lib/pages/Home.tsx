import { useState } from "react"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import {Button} from "../../components/ui/button.tsx";
import {Card} from "../../components/ui/card.tsx";
import {Input} from "../../components/ui/input.tsx";
import {BMIGauge} from "../../components/ui/bmi-gauge.tsx";
import profile from "../../assets/profile.png"
import recipe from "../../assets/register_image_2.png"
import article1 from "../../assets/register_image_3.png"
import article2 from "../../assets/landing_background_2.png";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<string | null>("item-1")
  const userName = "Kepintil"
  const currentBMI = 33

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const faqItems = [
    {
      id: "item-1",
      question: "Can I track my progress?",
      answer:
        "Yes! FitFuel allows you to log your meals, track your calorie intake, and monitor your progress over time. You can also set goals and receive personalized recommendations.",
    },
    {
      id: "item-2",
      question: "How do I contact FitFuel support?",
      answer: "You can reach us through our help center in the app or email us at support@fitfuel.com.",
    },
    {
      id: "item-3",
      question: "What is FitFuel?",
      answer:
        "FitFuel is a comprehensive nutrition and fitness app designed to help you achieve your health goals through personalized meal plans, recipes, and fitness tracking.",
    },
    {
      id: "item-4",
      question: "How does FitFuel use my BMI?",
      answer:
        "FitFuel uses your BMI as a starting point to create a personalized nutrition plan. We combine this with your goals, preferences, and activity level to provide tailored recommendations.",
    },
    {
      id: "item-5",
      question: "What kind of meal plans does FitFuel provide?",
      answer:
        "FitFuel offers a variety of meal plans including keto, vegetarian, vegan, paleo, and balanced nutrition options. All plans can be customized to your preferences and dietary restrictions.",
    },
  ]

  const articles = [
    {
      id: 1,
      title: "What are the benefits of eating healthy?",
      image: article1,
    },
    {
      id: 2,
      title: 'Parkinson\'s disease prevention may begin "at the dinner table"',
      image: article2,
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">FitFuel</h1>
        <button onClick={toggleSidebar} className="p-1">
          <Menu className="h-6 w-6 text-primary" />
        </button>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-[#2d6a4f] to-[#1b4332] text-white p-6 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold">FitFuel</h2>
              <button onClick={toggleSidebar}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-6">
              <a href="/home" className="hover:underline text-destructive">
                Home
              </a>
              <a href="/recipe" className="hover:underline text-destructive">
                Recipe
              </a>
              <a href="/article" className="hover:underline text-destructive">
                Article
              </a>
            </nav>

            <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-white">
                <img src={profile} alt="Profile picture" className="object-cover" />
              </div>
              <div className="flex items-center">
                <span className="font-medium">{userName}</span>
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
            Good morning, <span className="text-[#95d5b2]">{userName}!</span>
          </h2>
        </div>

        {/* BMI Gauge */}
        <Card className="p-4 mb-6 shadow-sm">
          <div className="relative">
            <div className="flex justify-center mb-10">              
                <BMIGauge bmi={currentBMI} size={500}/>
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
        <div className="mb-6">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 bg-[#2d6a4f] text-white px-3 py-1 rounded-br-lg z-10 text-sm">
              Recipe of the day!
            </div>
            <div className="flex flex-row h-32">
              <div className="relative w-1/3">
                <img src={recipe} alt="Quinoa Salad" className="object-cover" />
              </div>
              <div className="w-2/3 p-3 bg-[#95d5b2] text-primary flex flex-col justify-between">
                <h3 className="font-bold text-lg">Quinoa Salad</h3>
                <p className="text-xs">Curious about other healthy recipes?</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-end bg-white text-primary hover:bg-gray-100 text-xs py-1 h-auto"
                >
                  See more!
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Newest Articles */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Newest Articles</h3>
          <div className="grid grid-cols-2 gap-4">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-24">
                  <img src={article.image} alt={article.title} className="object-cover" />
                </div>
                <div className="p-2 relative">
                  <p className="text-xs font-medium">{article.title}</p>
                  <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-sm">
                    <div className="bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">FAQ</h3>
          <div className="space-y-2">
            {faqItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-md overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-3 text-left bg-white"
                  onClick={() => toggleFaq(item.id)}
                >
                  <span className="text-sm font-medium">{item.question}</span>
                  {expandedFaq === item.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                {expandedFaq === item.id && <div className="p-3 bg-gray-50 text-xs">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-[#2d6a4f] text-white p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Contact Us</h3>
          <p className="text-sm mb-2">FitFuel@email.com</p>
          <p className="text-sm mb-2">123 Nutrition St., Health City</p>
          <p className="text-sm mb-4">+00 123 456 7890</p>

          <div className="flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none bg-white text-primary text-sm h-9"
            />
            <Button className="rounded-l-none bg-[#f25c05] text-sm h-9 px-3">Subscribe</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
