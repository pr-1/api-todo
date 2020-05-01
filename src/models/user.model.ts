import { prop } from '@typegoose/typegoose';

export class User {
  @prop({_id: true})
  id: string;
  @prop({required: true, unique: true, index: true})
  email: string;
  @prop({required: true})
  password: string;
}

