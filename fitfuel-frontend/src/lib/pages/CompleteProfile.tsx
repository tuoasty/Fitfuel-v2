import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {Card, CardContent} from "../../components/ui/card";
import {CalendarIcon, ChevronLeft, ChevronRight} from "lucide-react";
import {cn} from "../../lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover";
import complete_profile from "../../assets/landing_background_2.png";
import {addMonths, format, setMonth, setYear, subMonths} from "date-fns";
import {Calendar} from "../../components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {UseAuth} from "../../auth/AuthenticationContext.tsx";

type Inputs = {
    weight: number;
    height: number;
    dateOfBirth: string;
    dietPreference: "GENERAL" | "VEGAN" | "VEGETARIAN";
    activityLevel: "SEDENTARY" | "LIGHT" | "MODERATE" | "VERY" | "EXTRA";
};

export default function CompleteProfile() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [calendarDate, setCalendarDate] = useState(new Date());
    const {logout} = UseAuth();

    const dietPreferences = [
        {value: "GENERAL", label: "General"},
        {value: "VEGAN", label: "Vegan"},
        {value: "VEGETARIAN", label: "Vegetarian"},
    ];

    const activityLevels = [
        {value: "SEDENTARY", label: "Sedentary"},
        {value: "LIGHT", label: "Light"},
        {value: "MODERATE", label: "Moderate"},
        {value: "VERY", label: "Very"},
        {value: "EXTRA", label: "Extra"},
    ];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: currentYear - 1899}, (_, i) => currentYear - i);

    const handlePreviousMonth = () => {
        setCalendarDate(prev => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCalendarDate(prev => addMonths(prev, 1));
    };

    const handleMonthChange = (monthIndex: string) => {
        setCalendarDate(prev => setMonth(prev, parseInt(monthIndex)));
    };

    const handleYearChange = (year: string) => {
        setCalendarDate(prev => setYear(prev, parseInt(year)));
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<Inputs>({
        shouldFocusError: true
    });

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            setValue('dateOfBirth', selectedDate.toISOString(), {
                shouldValidate: true,
                shouldDirty: true
            });
        }
    };

    const handleDietPreferenceChange = (value: string) => {
        setValue('dietPreference', value as Inputs['dietPreference'], {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const handleActivityLevelChange = (value: string) => {
        setValue('activityLevel', value as Inputs['activityLevel'], {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const onSubmit = async (data: Inputs) => {
        setIsSubmitting(true);
        console.log(data);
        try {
            const response = await axios.post("http://localhost:3000/profile/complete", data, {
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success("Profile completed! Redirecting...");
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }
        } catch (error: unknown | AxiosError) {
            let errorMessage = "Completing profile failed.";
            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.message || "Unable to connect to server";
            }
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([_, error]) => {
                if (error?.message) {
                    toast.error(error.message);
                }
            });
        }
    }, [errors]);

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center">
            <div className="absolute inset-0">
                <img
                    src={complete_profile}
                    alt="Background"
                    className="w-full h-full object-cover opacity-50"
                />
            </div>

            <Card className="relative w-full max-w-md mx-4 bg-background/95 backdrop-blur-sm">
                <CardContent className="p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Complete Your Profile
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Weight (kg)</label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min={0}
                                    className="w-full"
                                    {...register("weight", {
                                        required: "Weight is required",
                                    })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Height (cm)</label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min={0}
                                    className="w-full"
                                    {...register("height", {
                                        required: "Height is required",
                                    })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Date of Birth
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal h-10",
                                            !date && "text-muted-foreground",
                                            "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-primary"/>
                                        {date ? format(date, "MMMM d, yyyy") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-3"
                                    align="start"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 bg-transparent border-0 hover:bg-accent"
                                            onClick={handlePreviousMonth}
                                        >
                                            <ChevronLeft className="h-4 w-4"/>
                                        </Button>

                                        <div className="flex space-x-1">
                                            <Select
                                                value={calendarDate.getMonth().toString()}
                                                onValueChange={handleMonthChange}
                                            >
                                                <SelectTrigger className="h-7 w-24">
                                                    <SelectValue>
                                                        {months[calendarDate.getMonth()]}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {months.map((month, index) => (
                                                        <SelectItem key={index} value={index.toString()}>
                                                            {month}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Select
                                                value={calendarDate.getFullYear().toString()}
                                                onValueChange={handleYearChange}
                                            >
                                                <SelectTrigger className="h-7 w-20">
                                                    <SelectValue>
                                                        {calendarDate.getFullYear()}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent className="h-48 overflow-y-auto">
                                                    {years.map(year => (
                                                        <SelectItem key={year} value={year.toString()}>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7 bg-transparent border-0 hover:bg-accent"
                                            onClick={handleNextMonth}
                                        >
                                            <ChevronRight className="h-4 w-4"/>
                                        </Button>
                                    </div>

                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateSelect}
                                        {...register('dateOfBirth', {
                                            required: "Date of birth is required"
                                        })}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        month={calendarDate}
                                        onMonthChange={setCalendarDate}
                                        initialFocus
                                        classNames={{
                                            months: "space-y-4",
                                            head_row: "flex justify-between",
                                            head_cell: cn(
                                                "text-muted-foreground font-normal w-9",
                                                "text-center p-0 relative"
                                            ),
                                            row: "flex w-full mt-2",
                                            cell: cn(
                                                "h-9 w-9 text-center text-sm relative p-0",
                                                "hover:bg-accent hover:text-accent-foreground rounded-md",
                                                "focus-within:relative focus-within:z-20"
                                            ),
                                            day: cn(
                                                "h-9 w-9 p-0 font-normal",
                                                "aria-selected:opacity-100",
                                                "hover:bg-accent hover:text-accent-foreground rounded-md",
                                                "focus:bg-accent focus:text-accent-foreground focus:rounded-md"
                                            ),
                                            day_selected: "bg-primary text-primary-foreground rounded-md",
                                            caption: "sr-only",
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Diet Preference
                            </label>
                            <Select
                                onValueChange={handleDietPreferenceChange}
                                {...register('dietPreference', {
                                    required: "Diet preference is required"
                                })}
                            >
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Select diet preference"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {dietPreferences.map((diet) => (
                                        <SelectItem key={diet.value} value={diet.value}>
                                            {diet.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Activity Level
                            </label>
                            <Select
                                onValueChange={handleActivityLevelChange}
                                {...register('activityLevel', {
                                    required: "Activity level is required"
                                })}
                            >
                                <SelectTrigger className="w-full h-10">
                                    <SelectValue placeholder="Select activity level"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {activityLevels.map((activity) => (
                                        <SelectItem key={activity.value} value={activity.value}>
                                            {activity.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Complete Profile"}
                        </Button>
                    </form>
                    <Button type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={logout}>
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}