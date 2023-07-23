import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

let app: INestApplication;
beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

const userData = {
  email: faker.internet.email(),
  password: 'password',
  name: faker.internet.displayName(),
};
let access_token: string;

describe('Auth Controller (e2e)', () => {
  /**
   * Register
   */
  describe('/api/register (POST)', () => {
    it('should return NEW account', async () => {
      await request(app.getHttpServer()).post('/account/register').send(userData).expect(201);
    });

    it('should return ERROR when duplicate', async () => {
      await request(app.getHttpServer()).post('/account/register').send(userData).expect(403);
    });
  });

  /**
   * Login
   */
  describe('/account/login (POST)', () => {
    it('should return an access token when login is successful', async () => {
      const response = await request(app.getHttpServer()).post('/account/login').send(userData).expect(200);

      expect(response.body).toHaveProperty('access_token');
      access_token = response.body.access_token;
    });

    it('should return an ERROR if login credentials wrong', async () => {
      const invalidUserData = {
        email: 'invaliduser@gmail.com',
        password: 'wrongpassword',
      };
      await request(app.getHttpServer()).post('/account/login').send(invalidUserData).expect(404);
    });
  });
});

const newTaskData = {
  title: 'Create New Color on Footer',
  description: 'The new color should be bright',
};

let newTaskId: number;
describe('Task Controller (e2e)', () => {
  /**
   * Create New Task
   */
  describe('/task/create (POST)', () => {
    it('should return NEW task', async () => {
      const response = await request(app.getHttpServer()).post('/task/create').set('Authorization', `Bearer ${access_token}`).send(newTaskData).expect(201);
      newTaskId = response.body.id;
    });
  });

  /**
   * Assign New Task
   */
  describe('/task/assign/:id (PATCH)', () => {
    it('should return updated task if successful', async () => {
      await request(app.getHttpServer()).patch(`/task/assign/${newTaskId}`).set('Authorization', `Bearer ${access_token}`).send({ staff_id: 1 }).expect(200);
    });
  });

  /**
   * Mark Task As Complete
   */
  describe('/task/complete/:id (PATCH)', () => {
    it('should return updated task if successful', async () => {
      await request(app.getHttpServer())
        .patch(`/task/complete/${newTaskId}`)
        .set('Authorization', `Bearer ${access_token}`)
        .send({ is_completed: true })
        .expect(200);
    });
  });

  /**
   * Get All Task
   */
  describe('/task (GET)', () => {
    it('should return all task if successful', async () => {
      await request(app.getHttpServer()).get('/task').set('Authorization', `Bearer ${access_token}`).expect(200);
    });
  });

  /**
   * Get Detail of A Task
   */
  describe('/task/:id (GET)', () => {
    it('should return task detail if successful', async () => {
      await request(app.getHttpServer()).get(`/task/${newTaskId}`).set('Authorization', `Bearer ${access_token}`).send(userData).expect(200);
    });
  });

  /**
   * Delete a Task
   */
  describe('/task/delete/:id (DELETE)', () => {
    it('should return the deleted task if successful', async () => {
      await request(app.getHttpServer()).delete(`/task/delete/${newTaskId}`).set('Authorization', `Bearer ${access_token}`).send(userData).expect(200);
    });
  });
});
