import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { WithPathLogger } from 'src/logger/with-path.logger';

const UsersServiceMock = {
  provide: UsersService,
  useValue: {
    getAll: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const WithPathLoggerMock = {
  provide: WithPathLogger,
  useValue: {},
};

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersServiceMock, WithPathLoggerMock],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call usersService.getAll', () => {
      controller.getAll();
      expect(usersService.getAll).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should call usersService.getOne', async () => {
      await controller.getOne(1);
      expect(usersService.getOne).toBeCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call usersService.create', async () => {
      controller.create({
        name: 'Test User',
        age: 20,
      });
      expect(usersService.create).toBeCalledWith({
        name: 'Test User',
        age: 20,
      });
    });
  });

  describe('update', () => {
    it('should call usersService.update', async () => {
      controller.update(1, {
        name: 'Test User',
        age: 20,
      });
      expect(usersService.update).toBeCalledWith(1, {
        name: 'Test User',
        age: 20,
      });
    });
  });

  describe('delete', () => {
    it('should call usersService.delete', async () => {
      controller.remove(1);
      expect(usersService.delete).toBeCalledWith(1);
    });
  });
});
