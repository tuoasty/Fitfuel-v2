import { useForm} from "react-hook-form"

type Inputs = {
    email: string
    password: string
}

const onSubmit = async(data: Inputs) => {
    console.log(data);
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>();
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="Your email" {...register("email", {required:true})}/>
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Your password" type="password" {...register("password", {required: true})}/>
                {(errors.email || errors.password) && <span className="text-red-500">All fields must be filled</span>}
                <input type="submit"/>
            </form>
        </main>
    )
}