import AppError from '@shared/http/errors/AppErrors';
import { getCustomRepository } from 'typeorm';
import { hash } from "bcryptjs";
import { isAfter, addHours } from 'date-fns'
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exist.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token has expired.');
    }

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;
