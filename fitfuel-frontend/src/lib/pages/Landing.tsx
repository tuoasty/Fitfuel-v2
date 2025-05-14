import {Button} from "../../components/ui/button.tsx";
import background from "../../assets/landing_background_2.png"

function Landing() {
    return (
        <main className="bg-foreground relative w-full h-full font-bold text-background flex flex-col justify-center items-center">
            <img src={background} className="w-full h-full absolute z-10 opacity-25 object-cover"/>
            <div className="flex flex-col justify-evenly items-center w-80 h-[75%] z-10">
                <h1 className="w-full">FitFuel</h1>
                <div className="flex flex-col justify-evenly h-52">
                    <div>
                        <h3>Nourish Your Body.</h3>
                        <h3 className="text-destructive">Elevate Your Life.</h3>
                    </div>
                    <p>
                        Embark on a journey to better health with a personalized <span className="text-destructive font-bold max-w-xs">meal plan</span>. Discover the perfect balance of
                        flavor and nutrition, designed to fuel your day with vitality.
                    </p>
                </div>
                <Button className="bg-destructive text-background text-xl rounded-3xl w-48 h-16 font-bold">Get Started</Button>
            </div>
        </main>
    )
}

export default Landing;
