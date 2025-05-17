/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import {Response} from "express";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}
    async signIn(email:string, pass:string, res:Response) :Promise<void>{
        const user = await this.usersService.user({email:email})
        if(!user){
            throw new NotFoundException("User with email " + email + " not found")
        }

        if(user?.password !== pass){
            throw new UnauthorizedException("Wrong credentials");
        }
        const payload = {id: user.id, name:user.name ,email:user.email};
        const token = await this.jwtService.signAsync(payload);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).send({message:"Login successful", success: true})
    }    
    
    async signUp(first_name:string, last_name:string, phone_number:string, email:string, pass:string, res:Response) :Promise<void>{
        const existingUser = await this.usersService.user({email:email})

        if(existingUser){
            throw new UnauthorizedException('User with this email already exists');
        }

        const user = await this.usersService.createUser({
            email,
            name: `${first_name} ${last_name}`,
            password: pass,
            phone_number
        });

        res.status(200).send({message:"Register successful", success: true})
    }
}
