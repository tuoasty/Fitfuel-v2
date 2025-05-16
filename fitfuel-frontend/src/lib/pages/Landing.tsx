import {Button} from "../../components/ui/button.tsx";
import background from "../../assets/landing_background_2.png"
import food_image from "../../assets/landing_image.png"
import {useNavigate} from "react-router";

function Landing() {
    const navigate = useNavigate();
    return (
        <main className="relative w-full min-h-screen overflow-hidden bg-foreground text-background">
            <img alt="Background Image" src={background} className="w-full h-full absolute z-10 opacity-15 object-cover"/>
            <div className="relative z-10 flex flex-col md:flex-row justify-evenly w-full min-h-screen">
                <div className="flex flex-col justify-center px-8 py-16 w-full md:hidden">
                    <h1 className="text-5xl font-bold text-white mb-8">FitFuel</h1>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white">Nourish Your Body,</h2>
                        <h2 className="text-3xl font-bold text-destructive">Elevate Your Life.</h2>
                    </div>
                    <p className="text-white mb-12 max-w-xs">
                        Embark on a journey to better health with a personalized{" "}
                        <span className="text-destructive font-bold">meal plan</span>. Discover the perfect balance of flavor and
                        nutrition, designed to fuel your day with vitality.
                    </p>

                    <Button
                        className="bg-destructive text-white text-xl rounded-full w-48 h-16 font-bold hover:bg-destructive/90"
                        onClick={() => navigate("/login")}
                    >
                        Get Started
                    </Button>
                </div>
                <div className="hidden md:flex w-full">
                    <div className="flex flex-col justify-center px-16 py-8 w-1/2">
                        <h1 className="text-6xl font-bold mb-8">FitFuel</h1>

                        <div className="mb-8">
                            <h2 className="text-4xl font-bold">Nourish Your Body,</h2>
                            <h2 className="text-4xl font-bold text-destructive">Elevate Your Life.</h2>
                        </div>

                        <p className="mb-12 max-w-md text-lg">
                            Embark on a journey to better health with a personalized{" "}
                            <span className="text-destructive font-bold">meal plan</span>. Discover the perfect balance of flavor and
                            nutrition, designed to fuel your day with vitality.
                        </p>

                        <Button
                            className="bg-destructive text-white text-xl rounded-full px-8 py-6 font-bold hover:bg-chart-4/90 w-48"
                            onClick={() => navigate("/login")}
                        >
                            Get Started
                        </Button>
                    </div>

                    <div className="w-1/2 flex items-center justify-center">
                        <div className="relative w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-primary/70">
                                <img alt="Cover Image" src={food_image} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Landing;
