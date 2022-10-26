import { updateUserDTO } from './dto/update-user.dto';
import { createUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(userId: number): User {
    if (Number.isNaN(userId)) {
      throw new BadRequestException('Invalid user id');
    }
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException('The user is not found.');
    }
    return user;
  }

  create(userData: createUserDTO): User {
    const exists = this.users.find((user) => user.name === userData.name);
    if (exists) {
      throw new ConflictException('The user already exists.');
    }
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(userId: number, userData: updateUserDTO): User {
    const user = this.getOne(userId);
    this.delete(userId);
    const updatedUser = { ...user, ...userData };
    const exists = this.users.find((user) => user.name === userData.name);
    if (exists) {
      throw new ConflictException('The user already exists.');
    }
    this.users.push(updatedUser);
    return updatedUser;
  }

  delete(userId: number): User {
    const deletedUser = this.getOne(userId);
    this.users = this.users.filter((user) => user.id !== userId);
    return deletedUser;
  }
}
