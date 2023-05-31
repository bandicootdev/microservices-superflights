import { Document } from 'mongoose';
export interface PassengerInterface extends Document {
  name: string;
  email: string;
}
