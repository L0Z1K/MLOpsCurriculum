import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = controller.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a user', () => {
      controller.create({
        name: 'Test User',
        age: 20,
      });
      const user = controller.getOne(1);
      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
    });
  });

  describe('create', () => {
    it('should create a user', () => {
      const beforeUsers = controller.getAll().length;
      controller.create({
        name: 'Test User',
        age: 20,
      });
      const afterUsers = controller.getAll().length;
      expect(afterUsers).toBeGreaterThan(beforeUsers);
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      controller.create({
        name: 'Test User',
        age: 20,
      });
      controller.update(1, { name: 'Updated Test User' });
      const user = controller.getOne(1);
      expect(user.name).toEqual('Updated Test User');
    });

    it('should throw a NotFoundException', () => {
      try {
        controller.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('The user is not found.');
      }
    });
  });

  describe('delete', () => {
    it('delete a user', () => {
      controller.create({
        name: 'Test User',
        age: 20,
      });
      const beforeUsers = controller.getAll().length;
      controller.remove(1);
      const afterUsers = controller.getAll().length;
      expect(afterUsers).toEqual(beforeUsers - 1);
    });

    it('should throw a NotFoundException', () => {
      try {
        controller.remove(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('The user is not found.');
      }
    });
  });
});
