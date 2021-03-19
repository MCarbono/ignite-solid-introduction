import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if(!user)
      throw new Error('User does not exists')

    const userAdmin = this.usersRepository.verifyAdmin(user_id);

    if(userAdmin)
      throw new Error('User already is a admin')
    
    return this.usersRepository.turnAdmin(user);
  }
}

export { TurnUserAdminUseCase };
