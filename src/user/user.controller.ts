import {
  Controller,
  Get,
  Post,
  Put,
  UsePipes,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JoiValidationPipe } from 'src/utils/joiValidation.pipe';
import { UserService } from './user.service';
import { UserDocument } from 'src/schemas/user.schema';
import {
  createUserValidation,
  updateUserPassValidation,
  updateUserValidation,
} from './user.joi';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './users.dto';
import ShortyHttpException from 'src/utils/ShortyHttpException';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/utils/req-logistics';
import { IAuthUser } from 'src/utils/common.interface';
import { SALT_OR_ROUNDS } from 'src/utils/constants';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get All the valid users' })
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<UserDocument[]> {
    try {
      return await this.userService.getUsers();
    } catch (e) {
      throw new ShortyHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message,
      });
    }
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get my details' })
  @UseGuards(JwtAuthGuard)
  async getUser(@User() user: IAuthUser): Promise<UserDocument> {
    try {
      return await this.userService.getUser(user.userId);
    } catch (e) {
      throw new ShortyHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message,
      });
    }
  }

  @Put('/')
  @ApiOperation({ summary: 'Update details' })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @User() user: IAuthUser,
    @Body(new JoiValidationPipe(updateUserValidation))
    updatedData: UpdateUserDto,
  ) {
    try {
      return await this.userService.updateUser(user.userId, updatedData);
    } catch (e) {
      throw new ShortyHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message,
      });
    }
  }

  @Put('/update-password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiBody({ type: UpdateUserPasswordDto })
  @UseGuards(JwtAuthGuard)
  async updateUserPassword(
    @User() user: IAuthUser,
    @Body(new JoiValidationPipe(updateUserPassValidation))
    updatedData: UpdateUserDto,
  ) {
    try {
      const { password } = updatedData;
      const hash = await bcrypt.hash(password, SALT_OR_ROUNDS);
      const resData = { password: hash };
      return await this.userService.updateUser(
        user.userId,
        resData as UpdateUserDto,
      );
    } catch (e) {
      throw new ShortyHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message,
      });
    }
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create User with valid information' })
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new JoiValidationPipe(createUserValidation))
  async createUser(@Body() userData: CreateUserDto) {
    try {
      return await this.userService.createUser(userData);
    } catch (e) {
      throw new ShortyHttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e?.message,
      });
    }
  }
}
