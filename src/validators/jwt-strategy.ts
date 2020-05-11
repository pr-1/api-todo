import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '../models/payload.model';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret@1234'
    });
  }

  async validate(payload: Payload): Promise<User> {
    const user = this.userModel.findOne({email: payload.email});

    if(!user) {
      throw new UnauthorizedException('User Not Found');
    }
    return user;
  }
}