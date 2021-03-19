import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userExists = this.usersRepository.findById(user_id)

    if(!userExists)
      throw new Error('User does not exists');

    const userAdmin = this.usersRepository.verifyAdmin(user_id)

    if(!userAdmin)
      throw new Error('User is not a admin')

    return this.usersRepository.list()
  }
}

export { ListAllUsersUseCase };
