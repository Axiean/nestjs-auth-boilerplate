import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupWithCredenetialsInputDto } from 'src/auth/dto';
import { EXCEPTION_RESPONSE } from 'src/shared/config';
import { USER_ROLES } from 'src/shared/types';
import { handleAsyncOperation, hashString } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { searchUserEmailOutputDto } from './dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id, locked: false });
    if (!user) throw new NotFoundException(EXCEPTION_RESPONSE.USER_NOT_FOUND);
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email, locked: false });
    if (!user) throw new NotFoundException(EXCEPTION_RESPONSE.USER_NOT_FOUND);
    return user;
  }

  public async createNewUser(data: SignupWithCredenetialsInputDto) {
    return handleAsyncOperation(async () => {
      const { email, password, ip, name } = data;
      const hashedPass = hashString(password);
      const user = this.userRepository.create({ name, email, ip, password: hashedPass, role: USER_ROLES.USER });
      return await this.userRepository.save(user);
    }, 'error creating new user');
  }

  public async changeUserPassword(id: string, password: string) {
    return handleAsyncOperation(async () => {
      const user = await this.findUserById(id);
      if (!user) throw new NotFoundException(EXCEPTION_RESPONSE.USER_NOT_FOUND);
      const hashedPass = hashString(password);
      user.password = hashedPass;
      return await this.userRepository.save(user);
    }, 'error updating password');
  }

  public async searchUserEmail(email: string): Promise<searchUserEmailOutputDto> {
    return handleAsyncOperation(async () => {
      const user = await this.userRepository.findOne({ where: { email, locked: false }, select: { id: true, email: true, name: true } });
      if (!user) throw new NotFoundException(EXCEPTION_RESPONSE.USER_NOT_FOUND);
      return user;
    }, 'error finding user email');
  }
}
