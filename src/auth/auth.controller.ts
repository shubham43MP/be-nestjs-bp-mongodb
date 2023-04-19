import {
  Controller,
  Post,
  Logger,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from 'src/utils/req-logistics';

@Controller('/auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ summary: 'Login API with username and password' })
  @UseGuards(LocalAuthGuard)
  async login(@User() user) {
    this.logger.log('User Validated. Logging in');
    return this.authService.login(user);
  }
}
