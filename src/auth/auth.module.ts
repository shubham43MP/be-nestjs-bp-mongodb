import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { jwtConstants } from './auth.constant';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        privateKey: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: jwtConstants.expiresIn },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
