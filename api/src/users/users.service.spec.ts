import { User } from './user.entity';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const mockUsersRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: mockUsersRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', async () => {
      jest.spyOn(mockUsersRepo, 'find').mockResolvedValue([]);
      const result = await service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a user', async () => {
      jest.spyOn(mockUsersRepo, 'findOneBy').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 30,
      });
      const user = await service.getOne(1);
      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
    });

    it('should throw 404 error', async () => {
      jest.spyOn(mockUsersRepo, 'findOneBy').mockResolvedValue(undefined);
      expect(async () => await service.getOne(999)).rejects.toThrow(
        new NotFoundException('The user is not found.'),
      );
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(mockUsersRepo, 'findOneBy').mockResolvedValue(undefined);
      jest.spyOn(mockUsersRepo, 'find').mockResolvedValue([
        {
          id: 1,
          name: 'Test User',
          age: 30,
        },
      ]);
      const afterUsers = await service.getAll();
      expect(afterUsers.length).toEqual(1);
    });

    it('should throw 409 error because name already exists', async () => {
      jest.spyOn(mockUsersRepo, 'findOneBy').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 30,
      });
      expect(
        async () =>
          await service.create({
            name: 'Test User',
            age: 30,
          }),
      ).rejects.toThrow(new ConflictException('The user already exists.'));
    });
  });

  describe('update', () => {
    it('should update a user name', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 30,
      });
      jest.spyOn(mockUsersRepo, 'save').mockResolvedValue({
        id: 1,
        name: 'Updated Test User',
        age: 30,
      });
      const user = await service.update(1, { name: 'Updated Test User' });
      expect(user.name).toEqual('Updated Test User');
    });

    it('should update a user age', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 30,
      });
      jest.spyOn(mockUsersRepo, 'save').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 25,
      });
      const user = await service.update(1, { age: 25 });
      expect(user.age).toEqual(25);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 30,
      });
      jest.spyOn(mockUsersRepo, 'delete').mockResolvedValue({
        id: 1,
        name: 'Test User',
        age: 30,
      });
      const user = await service.delete(1);
      expect(user.id).toEqual(1);
    });
  });
});
