import {Injectable} from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1,
            email: "kevin@gmail.com",
            password:"kevin"
        },
    ];
    async findOne(email:string): Promise<User|undefined> {
        return this.users.find(user => user.email === email);
    }
}
