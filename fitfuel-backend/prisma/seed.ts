/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import * as process from "node:process";

const prisma = new PrismaClient();
async function main(){
    await prisma.user.createMany({
        data: [
            {id:"dc8b5570-7735-4184-952a-27aa31cd8d90", name: "kevin", email: "kevin@gmail.com", password: "kevin", phone_number: "12345678"},
            {id:"1bfbc920-1517-4827-bf2f-622e828c387f", name: "octa", email: "octa@gmail.com", password: "octa", phone_number: "12345678"},
        ]
    })

    await prisma.profile.createMany({
        data: [
            {id:"b1743b42-067d-4e8a-8576-aeb6698b7977", userId:"1bfbc920-1517-4827-bf2f-622e828c387f", weight:50, height:50, dateOfBirth:new Date(Date.now()),
            picture_url:"https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/profile-picture/1bfbc920-1517-4827-bf2f-622e828c387f/9lskx5.jpg"},
            {id:"61c15379-348a-43e9-b6b3-8a93967f8ce1", userId:"dc8b5570-7735-4184-952a-27aa31cd8d90", weight:50, height:50, dateOfBirth:new Date(Date.now()),
                picture_url:"https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/profile-picture/dc8b5570-7735-4184-952a-27aa31cd8d90/433727.jpg"}
        ]
    })

    await prisma.recipe.createMany({
        data: [
            {
                id:"bfda07e8-68ce-4508-b862-c590a8ce2d49",
                name:"Grilled Chicken",
                description:"Chicken grilled with butter",
                time:"5 min",
                calories:250,
                protein:20,
                carbs:30,
                fat:15,
                fiber:10,
                ingredients: [
                    "250g chicken",
                    "butter as needed"
                ],
                directions: [
                    "Put butter in the pan",
                    "Sear the chicken until golden brown"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/bfda07e8-68ce-4508-b862-c590a8ce2d49/grilled-chicken.jpg"
            },
            {
                id: "4799a504-37e5-4228-85dd-e2f05fa248b3",
                name: "Fried Rice",
                description: "Rice fried in a pan",
                time: "10 min",
                calories: 350,
                protein: 10,
                carbs: 50,
                fat: 10,
                fiber: 5,
                ingredients: [
                    "200g rice",
                    "toppings"
                ],
                directions: [
                    "Put rice in the pan",
                    "Put toppings"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/4799a504-37e5-4228-85dd-e2f05fa248b3/fried-rice.jpg"
            }
        ]
    })
}
main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})