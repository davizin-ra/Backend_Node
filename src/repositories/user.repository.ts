import {prisma} from "../prisma/client"

export class UserRepository {
    async findByEmail(email: string){
        return prisma.users.findUnique({ where:{email}});
    }
}