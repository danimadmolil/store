import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        Comment: { include: { user: { select: { name: true, email: true } } } },
      },
    });

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async addComment(_user, data) {
    const { productId, comment } = data.body;
    const user = await this.prisma.user.findUnique({
      where: { email: _user.email },
    });
    const createdComment = await this.prisma.comment.create({
      data: {
        comment,
        productId: Number(productId),
        userId: user.id,
      },
    });
    const productComments = await this.prisma.comment.findMany({
      where: { productId: Number(productId) },
      include: { user: { select: { name: true, email: true } }, product: true },
    });
    return productComments;
  }
  async dropProductFromOrder(user, data) {
    const pendingOrderOfCurrentUser = await this.prisma.order.findFirst({
      where: { status: 'pending', userId: Number(user.id) },
    });
    const productDeleted = await this.prisma.productOnOrder.delete({
      where: {
        orderId_productId: {
          orderId: pendingOrderOfCurrentUser.id,
          productId: Number(data.productId),
        },
      },
    });
    return productDeleted;
    const productToDelete = await this.prisma.productOnOrder;
    return productToDelete;
  }
}
