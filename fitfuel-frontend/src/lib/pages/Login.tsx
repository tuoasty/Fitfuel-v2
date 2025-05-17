import {useForm} from "react-hook-form"
import axios from "axios";
import background from "../../assets/landing_background_2.png";
import image from "../../assets/register_image_2.png";
import {Button} from "../../components/ui/button.tsx";
import {Card, CardContent} from "../../components/ui/card.tsx";
import {Mail, Lock} from "lucide-react"
import {Input} from "../../components/ui/input.tsx";
import { useState } from "react";
import {toast} from "sonner";
import API from "../../utils/API.ts";

type Inputs = {
    email: string
    password: string
}

export default function Login() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const logout = async () => {
        const response = await axios.post("http://localhost:3000/auth/logout");
        console.log(response);
        console.log(response.data.message);
    }

    const onSubmit = async (data: Inputs) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post("http://localhost:3000/auth/login", data, {
                withCredentials: true
            });
            if (response.data.success) {
                console.log(response);
                toast.success("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = '/home';
                }, 2000);
            }
        } catch (error) {
            let errorMessage = 'Login failed.';
            if(axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>();

    return (
        <main className="relative w-full h-full overflow-hidden bg-background text-foreground flex flex-col justify-center items-center">
            <img alt="Background Image" src={background || "/placeholder.svg"} className="w-full h-full absolute opacity-50 object-cover" />
            <Card className="relative flex-row bg-background w-[75%] h-[75%] z-20 rounded-2xl shadow-lg overflow-hidden border-0 p-0 m-0">
                <div className="relative w-[65%] hidden md:flex flex-col justify-center items-center bg-secondary text-secondary-foreground rounded-l-2xl shadow-lg p-0 m-0">
                    <img alt="Cover Image" src={image || "/placeholder.svg"} className="w-full h-full absolute opacity-25 object-cover" />
                    <div className="relative z-10 text-center space-y-4 text-background">
                        <h1 className="font-bold tracking-tight">Welcome Back</h1>
                        <h4 className="opacity-90 max-w-md">We're excited to see you again. Log in to access your account and continue your journey.</h4>
                    </div>
                </div>

                <CardContent className="relative flex-1 h-full p-0">
                    <form
                        className="relative flex h-full justify-center items-center flex-col p-8 space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full space-y-1">
                            <h2 className="font-semibold mb-6">Sign In</h2>

                            <div className="space-y-4 w-full">
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
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-destructive"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>

                        <p className="text-center">
                            Don't have an account?{" "}
                            <a href="/register" className="hover:underline text-destructive">
                                Sign up
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>

        </main>
    )
}