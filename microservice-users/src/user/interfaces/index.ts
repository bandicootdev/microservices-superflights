import { Document } from 'mongoose';
export interface UserInterface extends Document {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
