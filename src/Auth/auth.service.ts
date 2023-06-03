import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from '../entity/user.entity';
import { UserDto } from "src/dto/user/user-dto";
import { LoginUserDto } from "src/dto/user/user-login-dto";
import { CreateUserDto } from "src/dto/user/user-create-dto";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./jwt.strategy";
import { TokenPayload } from "src/interface/TokenPaylaod.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService,   @InjectRepository(UserEntity)    
    private readonly userRepo: Repository<UserEntity>,  private readonly configService: ConfigService) {
        
    }
    
    public async getUserFromAuthenticationToken(token: string) {
        const payload: TokenPayload = this.jwtService.verify(token, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
        });
        if (payload.username) {
          return this.usersService.getByUsername(payload.username);
        }
      }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }
        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        const user = await this.usersService.findByLogin(loginUserDto);    
        
        const token = this._createToken(user);
        
        console.log("login")

        return {
            username: user.username, roles:user.roles, ...token    
        };  
    }
    
    private _createToken({ username, roles }: UserDto): any { 
        const user: JwtPayload = { username, roles};    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: '1800s',
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }

    
    async getOne(id: number): Promise<UserEntity> {
        
        return await this.userRepo.findOne({
            where: {
                id
            } 
        })
    }
}



export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}

export interface LoginStatus {  
    username: string;

}