import { CRUD } from "../interfaces/crud.interface";
import { User } from "../models/relation";

export class UserRepository implements CRUD{
	create(data: any) {
		return User.create(data);
	}
	find(id: number) {
		return User.findByPk(id);
	}
  update(user: any, data: any) {
    return user.update(data);
  }
  delete(user: any) {
    return user.destroy();
  }
	findByEmail(email: string) {
		return User.findOne({ where: { email } });
	}
	findByUsername(username: string) {
		return User.findOne({ where: { username } });
	}
}
