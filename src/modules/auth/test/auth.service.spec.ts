import { HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { StaffService } from '../../staff/staff.service';
import { staffStub } from '../../staff/test/stubs/staff.stub';
import { AppModule } from '../../../app.module';
import { Staff } from '.prisma/client';

describe('AuthService', () => {
  let authService: AuthService;
  let staffService: StaffService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    staffService = module.get<StaffService>(StaffService);
    jwtService = module.get<JwtService>(JwtService);

    module.close();
  });

  describe('login', () => {
    describe('when login is called', () => {
      describe('Positif condition', () => {
        let payload: any;
        let staff: Staff;

        beforeEach(async () => {
          staff = staffStub();
          payload = {
            email: 'admin@gmail.com',
            password: 'password',
          };
          jest.spyOn(staffService, 'findOne').mockResolvedValue(staff);
        });

        test('should return an access token if login is successful', async () => {
          const result = await authService.login(payload);
          expect(result).toBeDefined();
        });

        test('should return same decoded data', async () => {
          const result: { access_token: string } = await authService.login(payload);
          const decodedToken: any = jwtService.decode(result.access_token) as Staff;

          expect(payload.email).toEqual(decodedToken.email);
        });
      });

      describe('negative', () => {
        test('should throw err if email or password wrong', async () => {
          let staff: Staff = staffStub();
          let payload: any = {
            email: 'admin@gmail.com',
            password: 'passwor',
          };
          jest.spyOn(staffService, 'findOne').mockResolvedValue(staffStub());

          jest.spyOn(jwtService, 'signAsync').mockResolvedValue('ajsdniawoaiwdjoiajwd');

          await expect(authService.login(payload)).rejects.toThrowError(new HttpException({ message: 'email or password wrong' }, HttpStatus.BAD_REQUEST));
        });
      });
    });
  });

  describe('register', () => {
    describe('positif', () => {
      test('should return staff', async () => {
        jest.spyOn(staffService, 'create').mockResolvedValue(staffStub());
        const result = await authService.register(staffStub());
        expect(result).toEqual(staffStub());
      });
    });
    describe('negatif', () => {
      test('Should return error', async () => {
        jest.spyOn(staffService, 'create').mockResolvedValue(null);
        try {
          await authService.register(staffStub());
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});

describe('register', () => {});
