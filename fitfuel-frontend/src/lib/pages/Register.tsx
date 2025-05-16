import {useForm} from "react-hook-form"
import axios from "axios";
import background from "../../assets/landing_background_2.png";
import image from "../../assets/register_image_2.png";
import {Button} from "../../components/ui/button.tsx";
import {Card, CardContent} from "../../components/ui/card.tsx";
import {Mail, Lock, UserRoundPen, Phone} from "lucide-react"
import {Input} from "../../components/ui/input.tsx";

type Inputs = {
    first_name: string
    last_name: string
    phone_number: string
    email: string
    password: string
}

const onSubmit = async (data: Inputs) => {
    console.log(data)
    try {
        const response = await axios.post("http://localhost:3000/auth/register", data);
        if (response.data.success) {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
}

export default function Register(){
    const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm<Inputs>();
    return (
        <main className="relative w-full h-full overflow-hidden bg-background text-foreground flex flex-col justify-center items-center">
            <img src={background || "/placeholder.svg"} className="w-full h-full absolute opacity-50 object-cover" />
            <Card className="relative flex-row bg-background w-[75%] h-[85  %] z-20 rounded-2xl shadow-lg overflow-hidden border-0 p-0 m-0">
                <div className="relative w-[65%] hidden md:flex flex-col justify-center items-center bg-secondary text-secondary-foreground rounded-l-2xl shadow-lg p-0 m-0">
                    <img src={image || "/placeholder.svg"} className="w-full h-full absolute opacity-25 object-cover" />
                    <div className="relative z-10 text-center space-y-4 text-background">
                        <h1 className="font-bold tracking-tight">Create Your Account</h1>
                        <h4 className="opacity-90 max-w-md">Join us today and start your journey. Sign up to access all features and personalize your experience.</h4>
                    </div>
                </div>

                <CardContent className="relative flex-1 h-full p-0">
                    <form
                        className="relative flex h-full justify-center items-center flex-col p-8 space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full space-y-">
                            <h2 className="font-semibold mb-6">Sign Up</h2>

                            <div className="space-y-4 w-full">
                                <div className="space-y-2">
                                    <label htmlFor="first_name">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <UserRoundPen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="first_name"
                                            placeholder="Your first name"
                                            className="pl-10"
                                            {...register("first_name", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="last_name">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <UserRoundPen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="last_name"
                                            placeholder="Your last name"
                                            className="pl-10"
                                            {...register("last_name", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone_number">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone_number"
                                            placeholder="Your phone number"
                                            className="pl-10"
                                            {...register("phone_number", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            placeholder="Your email"
                                            className="pl-10"
                                            {...register("email", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            placeholder="Your password"
                                            type="password"
                                            className="pl-10"
                                            {...register("password", { required: true })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {Object.keys(errors).length > 0 && (
                                <p className="text-destructive text-sm mt-2 text-center">
                                    Please fill all fields correctly
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-destructive">
                            Sign Up
                        </Button>

                        <p className="text-center">
                            Already have an account?{" "}
                            <a href="/login" className="hover:underline text-destructive">
                                Sign In
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>            
        </main>
    )
}