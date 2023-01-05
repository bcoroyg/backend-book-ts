import { User } from '../database/models';

export class UserService {
  private static _userServiceInstance: UserService;

  constructor() {}

  public static getInstance() {
    if (!UserService._userServiceInstance) {
      UserService._userServiceInstance = new UserService();
    }
    return UserService._userServiceInstance;
  }

  //mostrar un usuario por Id
  async getUserById(userId: string) {
    const user = await User.findById(userId);
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await User.findOne({ username });
    return user;
  }
}
