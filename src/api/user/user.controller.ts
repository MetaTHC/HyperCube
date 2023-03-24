import { Controller, Delete, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SaaS: User Controller')
@Controller('account')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return this.userService.getUser();
  }

  @Get('id')
  async getUserId() {
    return this.userService.getUser();
  }

  @Put('id')
  async updateUserId() {
    return this.userService.getUser();
  }

  @Delete('id')
  async deleteUserId() {
    return this.userService.getUser();
  }
}
