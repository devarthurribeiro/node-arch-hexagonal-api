import { faker } from "@faker-js/faker";
import { User } from "../../src/core/user/domain/User";
import { IFactory } from "./IFactory";

class UserFactory implements IFactory<User> {
  build(): User {
    return new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  buildList(size: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < size; i++) {
      users.push(this.build());
    }
    return users;
  }
}

export const userFactory = new UserFactory();