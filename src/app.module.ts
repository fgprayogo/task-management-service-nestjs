import { Module } from '@nestjs/common';
import { IndexModule } from './modules/index.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // .env config
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // jwt config
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1800s' },
    }),
    IndexModule,
  ]
})
export class AppModule {}
