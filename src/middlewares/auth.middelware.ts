import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private configservice:ConfigService){}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('access_token');
    if (!token) {
      throw new UnauthorizedException('You have to login or signup first');
    }
    try {
      const decoded = verify(token, this.configservice.get<string>('JWT_SECRET'));
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}