import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../../models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from '../../dto/auth-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../../models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService) {
  }

  async createUser(authDto: AuthDto) {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const user = new User();
    user.email = authDto.email;
    user.password = await this.hashPassword(authDto.password, salt);
    try {
      return await (new this.userModel(user)).save();
    } catch (e) {
      console.log(e);
      if(e.code === 11000) {
        throw new ConflictException('Username already exists');
      }
    }
  }

  async loginUser(authDto: AuthDto) {
    const user: User = await this.userModel.findOne({email: authDto.email});
    if(!user){
      throw( new NotFoundException('User Not Found'));
    }
    if(await this.validatePassword(authDto.password, user.password)) {
      const payload: Payload = {
        email: authDto.email
      };
      const token = await this.jwtService.sign(payload);
      return {
        data: {
          user,
          token
        }
      };
    } else {
      throw(new UnauthorizedException('Invalid Credentials'));
    }
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private validatePassword(enteredPassword: string, initialHash: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, initialHash);
  }
}
