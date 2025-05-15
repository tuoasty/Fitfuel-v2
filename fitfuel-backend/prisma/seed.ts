import { PrismaClient } from "@prisma/client";
import * as process from "node:process";

const prisma = new PrismaClient();
async function main(){
    await prisma.user.createMany({
        data: [
            {name: "kevin", email: "kevin@gmail.com", password: "kevin"},
            {name: "octa", email: "octa@gmail.com", password: "octa"},
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