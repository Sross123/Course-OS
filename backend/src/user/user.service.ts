import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } })
    }

    async createUser(createAuthDto: CreateAuthDto) {
        const { email, name, password, role } = createAuthDto;

        // hash password with salt rounds
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // create user
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
                role,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true

            }
        })
        return user;
    }

    async getAllUsers(){
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    }

    async getuserById(id: string){
        return this.prisma.user.findFirst({
            where:{
                id
            },
            select:{
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

}
