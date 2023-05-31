import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Passenger } from './schemas/passenger.schema';
import { Model } from 'mongoose';
import { PassengerInterface } from './passenger.interface';
import { PassengerDto } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(Passenger.name)
    private passengerModel: Model<PassengerInterface>,
  ) {}

  findAll(): Promise<PassengerInterface[]> {
    return this.passengerModel.find().exec();
  }

  findOne(id): Promise<PassengerInterface> {
    return this.passengerModel.findOne({ _id: id }).exec();
  }

  async create(passengerDto: PassengerDto): Promise<PassengerInterface> {
    const newPassenger = new this.passengerModel({ ...passengerDto });
    return await newPassenger.save();
  }

  async update(id: string, passengerDto: PassengerDto) {
    return this.passengerModel
      .findOneAndUpdate({ _id: id }, { ...passengerDto }, { new: true })
      .exec();
  }

  delete(id: string): Promise<PassengerInterface> {
    return this.passengerModel.findOneAndDelete({ _id: id }).exec();
  }
}
