import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      //   imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //   describe('getAll', () => {
  //     it('should return an array', () => {
  //       const result = service.getAll();
  //       expect(result).toBeInstanceOf(Array);
  //     });
  //   });

  //   describe('getOne', () => {
  //     it('should return a user', async () => {
  //       service.create({
  //         name: 'Test User',
  //         age: 20,
  //       });
  //       const user = await service.getOne(1);
  //       expect(user).toBeDefined();
  //       expect(user.id).toEqual(1);
  //     });

  //     it('should throw 404 error', () => {
  //       try {
  //         service.getOne(999);
  //       } catch (e) {
  //         expect(e).toBeInstanceOf(NotFoundException);
  //         expect(e.message).toEqual('The user is not found.');
  //       }
  //     });

  //     // I can't give string argument.
  //     // it('should throw 400 error', () => {
  //     //   try {
  //     //     service.getOne('abc');
  //     //   } catch (e) {
  //     //     expect(e).toBeInstanceOf(BadRequestException);
  //     //     expect(e.message).toEqual('Invalid user id');
  //     //   }
  //     // });
  //   });

  //   describe('create', () => {
  //     it('should create a user', async () => {
  //       const beforeUsers = await service.getAll();
  //       service.create({
  //         name: 'Test User',
  //         age: 20,
  //       });
  //       const afterUsers = await service.getAll();
  //       expect(afterUsers.length).toEqual(beforeUsers.length + 1);
  //     });

  //     it('should throw 400 error because of empty name', () => {
  //       try {
  //         service.create({
  //           name: '',
  //           age: 20,
  //         });
  //       } catch (e) {
  //         expect(e).toBeInstanceOf(BadRequestException);
  //         expect(e.message).toEqual('name parameter is empty.');
  //       }
  //     });

  //     it('should throw 409 error because name already exists', () => {
  //       service.create({
  //         name: 'Test User',
  //         age: 20,
  //       });
  //       try {
  //         service.create({
  //           name: 'Test User',
  //           age: 30,
  //         });
  //       } catch (e) {
  //         expect(e).toBeInstanceOf(ConflictException);
  //         expect(e.message).toEqual('The user already exists.');
  //       }
  //     });
  //   });

  //   describe('update', () => {
  //     it('should update a user', async () => {
  //       service.create({
  //         name: 'Test User',
  //         age: 20,
  //       });
  //       service.update(1, { name: 'Updated Test User' });
  //       const user = await service.getOne(1);
  //       expect(user.name).toEqual('Updated Test User');
  //     });

  //     it('should throw 409 error', () => {
  //       service.create({
  //         name: 'Test User',
  //         age: 20,
  //       });
  //       service.create({
  //         name: 'Test User2',
  //         age: 30,
  //       });
  //       try {
  //         service.update(1, { name: 'Test User2' });
  //       } catch (e) {
  //         expect(e).toBeInstanceOf(ConflictException);
  //         expect(e.message).toEqual('The user already exists.');
  //       }
  //     });
  //   });

  //   describe('delete', () => {
  //     it('should delete a user', async () => {
  //       service.create({
  //         name: 'Test User',
  //         age: 20,
  //       });
  //       const beforeUsers = (await service.getAll()).length;
  //       service.delete(1);
  //       const afterUsers = (await service.getAll()).length;
  //       expect(afterUsers).toEqual(beforeUsers - 1);
  //     });
  //   });
});
