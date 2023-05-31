import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserInterface>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  findAll(): Promise<UserInterface[]> {
    return this.userModel.find().exec();
  }

  findOne(id): Promise<UserInterface> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async create(userDto: UserDto): Promise<UserInterface> {
    const hash = await this.hashPassword(userDto.password);
    const newUser = new this.userModel({ ...userDto, password: hash });
    return await newUser.save();
  }

  async update(id: string, userDto: UserDto) {
    const hash = await this.hashPassword(userDto.password);
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        { ...userDto, password: hash },
        { new: true },
      )
      .exec();
  }

  delete(id: string): Promise<UserInterface> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
