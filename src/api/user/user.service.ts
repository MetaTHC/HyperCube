import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser() {
    return Promise.resolve(undefined);
  }

  async create(user: User) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
