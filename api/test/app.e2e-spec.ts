import { UsersModule } from './../src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../src/users/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../src/users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let userRepository: Repository<User>;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('DATABASE_HOST'),
            port: parseInt(configService.get<string>('DATABASE_PORT')),
            username: configService.get<string>('DATABASE_USER'),
            password: configService.get<string>('DATABASE_PASS'),
            database: configService.get<string>('DATABASE_TESTNAME'),
            autoLoadEntities: true,
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    userRepository = moduleFixture.get('UserRepository');
    userService = new UsersService(userRepository);
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('OK');
  });

  describe('/users (GET)', () => {
    it('shows all users', async () => {
      return request(app.getHttpServer()).get('/users').expect(200).expect([]);
    });
  });

  describe('/users/:id (GET)', () => {
    it('returns user well', () => {
      request(app.getHttpServer()).post('/users').send({
        name: 'Baek',
        age: 23,
      });
      return request(app.getHttpServer()).get('/users/1').expect(200).expect({
        id: 1,
        name: 'Baek',
        age: 23,
      });
    });
    it('throw 404 error because of no user', async () => {
      return request(app.getHttpServer()).get('/users/1').expect(404);
    });

    it('throw 400 error because id is not valid', async () => {
      return request(app.getHttpServer()).get('/users/abc').expect(400);
    });
  });

  describe('/users (POST)', () => {
    it('creates well', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ name: 'John Doe', age: 30 })
        .expect(201)
        .expect({
          id: 1,
          name: 'John Doe',
          age: 30,
        });
    });

    it('throw 400 error because of empty name', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ name: '', age: 30 })
        .expect(400);
    });

    it('throw 400 error because of not number age', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ name: 'test', age: '' })
        .expect(400);
    });
  });

  describe('/users/:id (PUT)', () => {
    it('updates well', () => {
      request(app.getHttpServer()).post('/users').send({
        name: 'Baek',
        age: 23,
      });
      return request(app.getHttpServer())
        .put('/users/1')
        .send({ name: 'John Doe', age: 30 })
        .expect(200)
        .expect({
          id: 1,
          name: 'John Doe',
          age: 30,
        });
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('deletes well', () => {
      request(app.getHttpServer()).post('/users').send({
        name: 'Baek',
        age: 23,
      });
      return request(app.getHttpServer()).delete('/users/1').expect(200);
    });
  });
});
