import Role from "src/enum/role.enum";

export class UserDto {  
    id: number;
    username: string;
    email: string; 
    roles: Role[];
}