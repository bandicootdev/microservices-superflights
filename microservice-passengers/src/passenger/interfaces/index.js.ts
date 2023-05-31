import { Document } from 'mongoose';
export interface PassengerInterface extends Document {
  readonly name: string;
  readonly email: string;
}
