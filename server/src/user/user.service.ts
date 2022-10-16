import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UserDeleteDto } from './dto';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async profile(user: any) {
    const result = await this.prisma.user.findUnique({
      where: { email: user.email },
      include: {
        Order: true,
      },
    });
    delete result.password;
    delete result.refreshToken;
    return result;
  }

  async updateUser(user: any, updateUser: UpdateUserDto) {
    let hashPassword;
    let updateObject = {};
    if (updateUser.password) {
      hashPassword = await argon2.hash(updateUser.password);
      updateObject['password'] = hashPassword;
    }
    if (updateUser.name) {
      updateObject['name'] = updateUser.name;
    }
    const updatedUser = this.prisma.user.update({
      where: { email: user.email },
      data: updateObject,
    });
    return updatedUser;
  }

  async deleteAccount(useDeleteDto: any) {
    const result = await this.prisma.user.delete({
      where: { email: useDeleteDto.email },
    });
    return result;
  }
  async getAllComments(user: any) {
    const comments = await this.prisma.comment.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    return comments;
  }
}
