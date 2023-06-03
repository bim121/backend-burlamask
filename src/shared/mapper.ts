import { UserDto } from "src/dto/user/user-dto";
import { UserEntity } from "src/entity/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, username, email, roles } = data;
    let userDto: UserDto = { id, username, email, roles };
    return userDto;
};