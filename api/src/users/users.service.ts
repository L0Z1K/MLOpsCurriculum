import { updateUserDTO } from './dto/update-user.dto';
import { createUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOne(id: number): Promise<User> {
    if (Number.isNaN(id)) {
      throw new BadRequestException('Invalid user id');
    }
    const user = this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('The user is not found.');
    }
    return user;
  }

  async create(userData: createUserDTO): Promise<User> {
    const exists = this.usersRepository.findOneBy({ name: userData.name });
    if (exists) {
      throw new ConflictException('The user already exists.');
    }
    const user = new User();
    user.name = userData.name;
    user.age = userData.age;
    await this.usersRepository.save(user);
    return user;
  }

  async update(userId: number, userData: updateUserDTO): Promise<User> {
    const user = await this.getOne(userId);
    if (userData.name) {
      user.name = userData.name;
    }
    if (userData.age) {
      user.age = userData.age;
    }
    await this.usersRepository.save(user);
    return user;
  }

  async delete(userId: number): Promise<User> {
    const deletedUser = await this.getOne(userId);
    await this.usersRepository.delete(deletedUser);
    return deletedUser;
  }
}
