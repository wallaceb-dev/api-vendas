import AppError from '@shared/http/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userEmail = await usersRepository.findByEmail(email);

    if (userEmail && id !== userEmail.id) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
