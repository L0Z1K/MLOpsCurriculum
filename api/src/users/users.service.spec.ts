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
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      //   imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
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

  describe('update', () => {});

  describe('delete', () => {});
});
