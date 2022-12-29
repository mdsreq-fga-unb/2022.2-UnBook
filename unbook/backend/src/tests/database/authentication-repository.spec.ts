/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoadAccountByEmailRepository } from "../../database/protocols/LoadAccountByEmailRepository";
import { AuthenticationRepository } from "../../database/repositories/AuthenticationRepository";
import { IAccountModel } from "../../domain/models/AccountModel";

describe("Authentication Repository", () => {
  test("Deve garantir a chamada do LoadAccountByEmailRepository com o email correto", async () => {
    class LoadAccountByEmailRepositoryStub
      implements ILoadAccountByEmailRepository
    {
      async load(email: string): Promise<IAccountModel> {
        const account: IAccountModel = {
          id: "any_id",
          name: "any_name",
          email: "any_email@mail.com",
          password: "any_password",
        };
        return new Promise((resolve) => resolve(account));
      }
    }

    const loadAccountByEmailRepositoryStub =
      new LoadAccountByEmailRepositoryStub();

    const sut = new AuthenticationRepository(loadAccountByEmailRepositoryStub);
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load");
    await sut.auth({
      email: "any_email@mail.com",
      password: "any_password",
    });
    expect(loadSpy).toHaveBeenLastCalledWith("any_email@mail.com");
  });
});
