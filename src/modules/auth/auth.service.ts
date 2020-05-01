import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../../models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from '../../dto/auth-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
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
    if(this.validatePassword(authDto.password, user.password)) {
      return {
        data: user
      };
    } else {
      throw(new UnauthorizedException())
    }
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private validatePassword(enteredPassword: string, initialHash: string) {
    return bcrypt.compare(enteredPassword, initialHash).pass
  }
}
