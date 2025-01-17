import { User } from "../entities/user.entity";

export interface IUserRepository {
    create(user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    save(user: User): Promise<User>;
}