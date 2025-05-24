/* eslint-disable prettier/prettier */
import {RecipeCategory, PrismaClient} from "@prisma/client";
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
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/bfda07e8-68ce-4508-b862-c590a8ce2d49/grilled-chicken.jpg",
                category: RecipeCategory.LUNCH
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
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/4799a504-37e5-4228-85dd-e2f05fa248b3/fried-rice.jpg",
                category: RecipeCategory.BREAKFAST
            },
            {
                id: "02ce0a71-7c66-41b1-b32a-438056273d55",
                name: "Beef Stir Fry",
                description: "Tender beef with mixed vegetables in soy sauce",
                time: "15 min",
                calories: 400,
                protein: 30,
                carbs: 25,
                fat: 20,
                fiber: 6,
                ingredients: [
                    "200g beef slices",
                    "1 bell pepper",
                    "1 onion",
                    "2 tbsp soy sauce",
                    "1 tbsp vegetable oil"
                ],
                directions: [
                    "Heat oil in a pan",
                    "Add beef and stir fry until browned",
                    "Add vegetables and cook until soft",
                    "Pour in soy sauce and mix well",
                    "Cook for another 2 minutes"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/02ce0a71-7c66-41b1-b32a-438056273d55/beef-stir-fry.jpg",
                category: RecipeCategory.DINNER
            },
            {
                id: "6b187702-2d80-477b-b415-e2119c271920",
                name: "Avocado Toast",
                description: "Toasted bread topped with seasoned mashed avocado",
                time: "5 min",
                calories: 280,
                protein: 6,
                carbs: 20,
                fat: 18,
                fiber: 7,
                ingredients: [
                    "2 slices of whole grain bread",
                    "1 ripe avocado",
                    "1 tsp lemon juice",
                    "Salt to taste",
                    "Chili flakes (optional)"
                ],
                directions: [
                    "Toast the bread slices",
                    "Mash the avocado in a bowl",
                    "Mix in lemon juice and salt",
                    "Spread avocado mix on toast",
                    "Sprinkle chili flakes if desired"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/6b187702-2d80-477b-b415-e2119c271920/avocado-toast.jpg",
                category: RecipeCategory.BREAKFAST
            },
            {
                id: "430e71e5-bef1-4eaf-b931-eb67f3fd55ca",
                name: "Creamy Mushroom Pasta",
                description: "Pasta in a rich and creamy mushroom sauce",
                time: "20 min",
                calories: 500,
                protein: 15,
                carbs: 60,
                fat: 25,
                fiber: 4,
                ingredients: [
                    "200g pasta",
                    "100g mushrooms",
                    "1/2 cup cream",
                    "1 garlic clove",
                    "1 tbsp olive oil"
                ],
                directions: [
                    "Boil pasta until al dente",
                    "Heat oil and sauté garlic and mushrooms",
                    "Pour in cream and simmer",
                    "Add cooked pasta to the sauce",
                    "Mix well and serve hot"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/430e71e5-bef1-4eaf-b931-eb67f3fd55ca/creamy-mushroom-pasta.jpg",
                category: RecipeCategory.LUNCH
            },
            {
                id: "78aa7c78-5f9d-4939-90fc-5ddbd275aee4",
                name: "Tuna Salad",
                description: "Fresh salad with tuna and vegetables",
                time: "10 min",
                calories: 220,
                protein: 18,
                carbs: 10,
                fat: 12,
                fiber: 5,
                ingredients: [
                    "1 can tuna",
                    "1 cucumber",
                    "1 tomato",
                    "Lettuce leaves",
                    "2 tbsp olive oil",
                    "1 tbsp vinegar"
                ],
                directions: [
                    "Chop all vegetables",
                    "Drain tuna and mix with vegetables",
                    "Add olive oil and vinegar",
                    "Toss until evenly coated",
                    "Serve chilled or room temperature"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/78aa7c78-5f9d-4939-90fc-5ddbd275aee4/tuna-salad.jpg",
                category: RecipeCategory.LUNCH
            },
            {
                id: "1b2dd2ed-a41f-4805-abf4-ca6ae718e696",
                name: "Vegetable Soup",
                description: "Hearty soup with assorted vegetables",
                time: "25 min",
                calories: 180,
                protein: 6,
                carbs: 30,
                fat: 5,
                fiber: 8,
                ingredients: [
                    "1 carrot",
                    "1 potato",
                    "1/2 cup green beans",
                    "1 tomato",
                    "1 onion",
                    "4 cups vegetable broth"
                ],
                directions: [
                    "Chop all vegetables into small pieces",
                    "Sauté onion in a pot",
                    "Add other vegetables and stir for 2 minutes",
                    "Pour in broth and bring to a boil",
                    "Simmer until vegetables are soft"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/1b2dd2ed-a41f-4805-abf4-ca6ae718e696/vegetable-soup.jpg",
                category: RecipeCategory.DINNER
            },
            {
                id: "5a691eb6-cb51-4482-aa92-6d623b42c224",
                name: "Peanut Butter Banana Smoothie",
                description: "Creamy smoothie with banana and peanut butter",
                time: "5 min",
                calories: 320,
                protein: 10,
                carbs: 35,
                fat: 15,
                fiber: 4,
                ingredients: [
                    "1 banana",
                    "2 tbsp peanut butter",
                    "1 cup milk",
                    "1 tsp honey",
                    "Ice cubes"
                ],
                directions: [
                    "Peel and slice the banana",
                    "Add all ingredients to a blender",
                    "Blend until smooth",
                    "Pour into a glass",
                    "Serve immediately"
                ],
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/recipe-picture/5a691eb6-cb51-4482-aa92-6d623b42c224/peanut-butter-smoothie.avif",
                category: RecipeCategory.BREAKFAST
            }
        ]
    })

    await prisma.article.createMany({
        data: [
            {
                id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                author: "John Smith",
                title: "The Benefits of Mediterranean Diet",
                content: "The Mediterranean diet emphasizes eating primarily plant-based foods, whole grains, legumes, nuts, and replacing butter with healthy fats such as olive oil. This eating pattern has been linked to reduced risk of heart disease, improved brain function, and increased longevity. Recent studies have shown that people following a Mediterranean diet have a 25% lower risk of developing cardiovascular disease...",
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/article-images/mediterranean-diet.jpg",
                created_at: new Date('2024-03-15'),
                updated_at: new Date('2024-03-15')
            },
            {
                id: "a12bc5d6-7890-4ef1-b234-c56d7e8f9a01",
                author: "Sarah Johnson",
                title: "Understanding Macronutrients",
                content: "Macronutrients are the nutrients we need in larger quantities that provide us with energy: protein, carbohydrates, and fats. Each plays a crucial role in our body. Proteins are essential for building and repairing tissues, carbohydrates are our body's main source of energy, and fats help us absorb vitamins and protect our organs...",
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/article-images/macronutrients.jpg",
                created_at: new Date('2024-03-16'),
                updated_at: new Date('2024-03-16')
            },
            {
                id: "b23cd4e5-8901-5fg2-c345-d67e8f9a0b12",
                author: "Mike Wilson",
                title: "The Importance of Post-Workout Nutrition",
                content: "What you eat after a workout is just as important as the workout itself. During exercise, your muscles use up their glycogen stores for fuel. The proteins in your muscles also get broken down and damaged. After your workout, your body tries to rebuild its glycogen stores and repair and regrow those muscle proteins...",
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/article-images/post-workout.jpg",
                created_at: new Date('2024-03-17'),
                updated_at: new Date('2024-03-17')
            },
            {
                id: "c34de5f6-9012-6gh3-d456-e78f9a0b1c23",
                author: "Emily Brown",
                title: "Mindful Eating Practices",
                content: "Mindful eating is about using mindfulness to reach a state of full attention to your experiences, cravings, and physical cues when eating. It involves observing rather than judging how the food makes you feel and letting go of food rules that don't serve your health and well-being...",
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/article-images/mindful-eating.jpg",
                created_at: new Date('2024-03-18'),
                updated_at: new Date('2024-03-18')
            },
            {
                id: "d45ef6g7-0123-7hi4-e567-f89a0b1c2d34",
                author: "David Lee",
                title: "Hydration and Exercise Performance",
                content: "Proper hydration is crucial for optimal exercise performance. Even mild dehydration can affect your physical performance and cognitive function. Water regulates your body temperature, lubricates your joints, and helps transport nutrients to give you energy and keep you healthy...",
                picture_url: "https://nkwfrmiuazvqdmfktfka.supabase.co/storage/v1/object/public/public-bucket/article-images/hydration.jpg",
                created_at: new Date('2024-03-19'),
                updated_at: new Date('2024-03-19')
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