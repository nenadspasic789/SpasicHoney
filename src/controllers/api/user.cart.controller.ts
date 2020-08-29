import { CartService } from "src/services/cart/cart.service";
import { Controller, Get, UseGuards, Req, Body, Post, Patch } from "@nestjs/common";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { Cart } from "src/entities/cart.entity";
import { Request } from "express";
import { AddArticleToCartDto } from "src/dtos/cart/add.article.to.cart.dto";
import { EditArticleDto } from "src/dtos/article/edit.article.dto";
import { EditArticleInCartDto } from "src/dtos/cart/edit.article.in.cart.dto";
import { OrderService } from "src/services/order/order.service";
import { Order } from "src/entities/order.entity";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/user/cart')
export class UserCartController {
    constructor (
        private cartService: CartService,
        private orderService: OrderService,
        ) {}

    private async getActiveCartForUserId(userId: number): Promise<Cart> {
        let cart =  await this.cartService.getLastActiveCartByUserId(userId);
        if(!cart) {
            cart =  await this.cartService.createNewCartForUser(userId);
        }
        return await this.cartService.getById(cart.cartId);
    }

    
    @Get() //  GET http://localhost:3000/api/user/cart/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async getCurrentCart(@Req() req: Request): Promise<Cart> {
        return await this.getActiveCartForUserId(req.token.id);
    }


    @Post('addToCart') //  POST http://localhost:3000/api/user/cart/addToCart/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async addToCart(@Body() data: AddArticleToCartDto, @Req() req: Request): Promise<Cart> {
        const cart = await this.getActiveCartForUserId(req.token.id);
        return this.cartService.addArticleToCart(cart.cartId, data.articleId, data.quantity);
    }

    @Patch() // PATCH http://localhost:3000/api/user/cart/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async changeQuantity(@Body() data: EditArticleInCartDto, @Req() req: Request): Promise<Cart> {
        const cart = await this.getActiveCartForUserId(req.token.id);
        return await this.cartService.changeQuantity(cart.cartId, data.articleId, data.quantity);
    }

    @Post('makeOrder') //  POST http://localhost:3000/api/user/cart/makeOrder/
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('user')
    async makeOrder(@Req() req: Request): Promise<Order | ApiResponse> {
        const cart = await this.getActiveCartForUserId(req.token.id);
        return await this.orderService.add(cart.cartId);
    }

}