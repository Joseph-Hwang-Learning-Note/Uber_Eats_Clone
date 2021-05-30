import { ExecutionContext, Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from '@auth/role.decorator';
import { JwtService } from '@jwt/jwt.service';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {} // Reflector gets the metadata
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'roles', // should be same as key in the decorator
      context.getHandler(),
    );
    if (!roles) return true;
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if (!token) return false;
    const decoded = this.jwtService.verify(token.toString());
    if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
      const { user } = await this.usersService.findById(decoded['id']);
      if (!user) return false;
      gqlContext['user'] = user;
      if (roles.includes('Any')) return true;
      return roles.includes(user.role);
    }
    return false;
  }
}
