import { Body, Controller } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerMSG } from '../common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMSG.FIND_ALL)
  gerAll() {
    return this.passengerService.findAll();
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  gerOne(@Payload() id: string) {
    return this.passengerService.findOne(id);
  }

  @MessagePattern(PassengerMSG.CREATE)
  create(@Body() passengerDto: PassengerDto) {
    return this.passengerService.create(passengerDto);
  }

  @MessagePattern(PassengerMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.passengerService.update(payload.id, payload.passengerDto);
  }

  @MessagePattern(PassengerMSG.DELETE)
  deleteOne(@Payload() id: string) {
    return this.passengerService.delete(id);
  }
}
