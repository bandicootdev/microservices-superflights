import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client.proxy';
import { lastValueFrom, Observable } from 'rxjs';
import { FlightMSG, PassengerMSG } from '../common/constants';
import { FlightDto } from './dto/flight.dto';

@Controller('flight')
export class FlightController {
  private _clientProxyFlights = this.clientProxy.clientProxyFlights();
  private _clientProxyPassengers = this.clientProxy.clientProxyPassengers();

  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  @Post()
  create(@Body() flightDto: FlightDto): Observable<any> {
    return this._clientProxyFlights.send(FlightMSG.CREATE, flightDto);
  }

  @Get()
  getAll() {
    return this._clientProxyFlights.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._clientProxyFlights.send(FlightMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() flightDto: FlightDto) {
    return this._clientProxyFlights.send(FlightMSG.UPDATE, {
      id,
      flightDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._clientProxyFlights.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await lastValueFrom(
      this._clientProxyPassengers.send(PassengerMSG.FIND_ONE, passengerId),
    );
    if (!passenger) throw new NotFoundException('Passenger not found');
    return this._clientProxyFlights.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
