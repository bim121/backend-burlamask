import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import Role from 'src/enum/role.enum';
import JwtAuthenticationGuard from './JwtAuthenticationGuard.guard';
import RequestWithUser from 'src/interface/requestWithUser.interface';
 
const RoleGuard = (role: Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      let contains = false;
      for (let index = 0; index < role.length; index++) {
        if (user?.roles.includes(role[index])) {
          contains = true;
          break;
        }
      }
      return contains;
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;