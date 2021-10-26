import { User } from '../../modules/user/entities/user.entity';

export interface ITokenUser {
  user: User;
  token: string;
}
