import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { StaffService } from '../staff/staff.service';
import { Staff } from '@prisma/client';
import { Role } from '../staff/dto/staff.dto';

@Injectable()
export class AuthService {
  constructor(private staffService: StaffService, private jwtService: JwtService) {}

  async login(body: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = body;
    const user: Staff = await this.staffService.findOne(email);
    const encryptPassword = await this.encrypt(password);
    if (user?.password !== encryptPassword) {
      throw new HttpException({ message: 'email or password wrong' }, HttpStatus.BAD_REQUEST);
    }
    const payload = {
      id: user.id,
      name: user.password,
      email: user.email,
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async register(body: RegisterDto): Promise<Staff> {
    const { email, password, name } = body;
    const encryptedPassword = await this.encrypt(password);
    const payload = {
      email,
      name,
      password: encryptedPassword,
      created_at: new Date(Date.now()),
      role: Role.REGULAR,
    };
    return await this.staffService.create(payload);
  }

  private async encrypt(textToEncrypt: string) {
    const iv = Buffer.from(process.env.INITIALIZATION_VECTOR, 'hex');
    const key = (await promisify(scrypt)(process.env.PASSWORD_ENCRYPTION_KEY, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);
    return encryptedText.toString('hex');
  }

  private async decrypt(textToDecypt: string): Promise<any> {
    const iv = Buffer.from(process.env.INITIALIZATION_VECTOR, 'hex');
    const key = (await promisify(scrypt)(process.env.PASSWORD_ENCRYPTION_KEY, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.from(textToDecypt, 'hex');
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decryptedBuffer.toString();
  }
}
