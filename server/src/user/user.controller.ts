import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateUserDto, UserDeleteDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  getMe(@Req() req: Request) {
    return this.userService.profile(req.user);
  }
  @Post('update')
  editProfile(@Body() edit: UpdateUserDto, @Req() req: Request) {
    return this.userService.updateUser(req.user, edit);
  }
  @Get('delete')
  deleteAccount(@Req() req: Request) {
    return this.userService.deleteAccount(req.user);
  }
}
