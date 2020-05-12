import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    public async signUp (authCredentionsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentionsDto)
    }

    public async  signIn (authCredentionsDto: AuthCredentialsDto) : Promise<void> {
        const username = await this.userRepository.validateUserPassword(authCredentionsDto)
        
        if (!username) {
            throw new UnauthorizedException('Invalid credentials')
        }
    }
}
