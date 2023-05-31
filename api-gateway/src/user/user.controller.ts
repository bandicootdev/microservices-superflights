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
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { UserMSG } from '../common/constants';

@Controller('user')
export class UserController {
  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  @Post()
  create(@Body() userDto: UserDto): Observable<any> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDto);
  }

  @Get()
  getAll() {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
