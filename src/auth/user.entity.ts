import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    async validatePassword (password: string) : Promise<boolean> {
        return await bcrypt.hash(password, this.salt) === this.password
    }
}