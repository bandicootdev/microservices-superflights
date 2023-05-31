import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client.proxy';
import { Observable } from 'rxjs';
import { PassengerMSG } from '../common/constants';
import { PassengerDto } from './dto/passenger.dto';

@Controller('passenger')
export class PassengerController {
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  @Post()
  create(@Body() passengerDto: PassengerDto): Observable<any> {
    return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDto);
  }

  @Get()
  getAll() {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() passengerDto: PassengerDto) {
    return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      passengerDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }
}
