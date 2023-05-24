import { CreateUserUseCase } from "../../src/core/user/application/usecase/CreateUserUseCase";
import { container } from "../../src/infra/inversify.config";
import { IUserRepository } from "../../src/core/user/application/service/IUserRepository";
import { IJWTService } from "../../src/core/user/application/service/JWTService";
import { userFactory } from "../factories/UserFactory";

describe("CreateUserUseCase", () => {
  let jwtServiceMock: IJWTService;
  const userRepository = container.get<IUserRepository>("IUserRepository");
  let createUserUseCase: CreateUserUseCase;

  const newUser = userFactory.build();

  beforeEach(() => {
    jwtServiceMock = {
      hashPassword: jest.fn(() => Promise.resolve("hashedPassword")),
      generateToken: jest.fn(),
    };
    createUserUseCase = new CreateUserUseCase(userRepository, jwtServiceMock);
  });

  it("cria um usuário", async () => {
    const user = await createUserUseCase.execute(newUser);

    expect(user).toBeTruthy();
    expect(jwtServiceMock.hashPassword).toBeCalledWith(expect.any(String));
  });

  it("cria usuário existente", async () => {
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow(
      "User already exists"
    );
  });
});
