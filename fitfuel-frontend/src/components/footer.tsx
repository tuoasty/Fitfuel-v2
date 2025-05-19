import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export function Footer() {
    return (
        <main>
            <div>
                <Card className="bg-primary text-background p-4 rounded-lg">
                    <div className="relative">
                        <div className="absolute top-0 right-0 p-4">
                        <h2 className="font-bold text-xl">FitFuel</h2>
                        </div>
                        <div className="flex flex-row justify-between gap-8 mt-12">
                        <CardContent className="flex-1">
                            <h4 className="font-bold mb-3">Contact Us</h4>
                            <p className="text-sm mb-2">FitFuel@email.com</p>
                            <p className="text-sm mb-2">Jl. Raya Kb. Jeruk No. 27, Kemanggisan, Jakarta Barat</p>
                            <p className="text-sm">+62 804 - 169 - 6969</p>
                        </CardContent>

                        <CardContent className="flex-1">
                            <p className="mb-2">Enter your email to subscribe</p>
                            <div className="flex">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="rounded-r-none bg-background text-primary text-sm h-9"
                            />
                            <Button className="rounded-l-none bg-[#f25c05] text-sm h-9 px-3">Subscribe</Button>
                            </div>
                        </CardContent>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    )
}