import { Request } from 'express';
import { UserEntity } from 'src/entity/user.entity';
import Role from 'src/enum/role.enum';
 
interface RequestWithUser extends Request {
  user: UserEntity;
  roles: Role[];
}
 
export default RequestWithUser;