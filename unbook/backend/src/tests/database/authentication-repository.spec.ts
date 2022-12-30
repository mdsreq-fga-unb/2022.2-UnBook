/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository,
  ILoadAccountByEmailRepository,
  IAccountModel,
  IAuthenticationModel,
} from "../../database/protocols/criptography/db-authentication-protocols";
import { AuthenticationRepository } from "../../database/repositories/AuthenticationRepository";

const makeFaceAccount = (): IAccountModel => {
  return {
    id: "any_id",
    name: "any_name",
    email: "any_email@mail.com",
    password: "hashed_password",
  };
};

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository
  {
    async loadByEmail(email: string): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFaceAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeFakeAuthentication = (): IAuthenticationModel => {
  return {
    email: "any_email@mail.com",
    password: "any_password",
  };
};

const makeHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new HashComparerStub();
};

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(id: string): Promise<string> {
      return new Promise((resolve) => resolve("any_token"));
    }
  }
  return new EncrypterStub();
};

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAcessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAcessToken(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new UpdateAcessTokenRepositoryStub();
};

interface ISutTypes {
  sut: AuthenticationRepository;
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
  hashComparerStub: IHashComparer;
  encrypterStub: IEncrypter;
  updtadeAcessTokenRepositoryStub: IUpdateAccessTokenRepository;
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const encrypterStub = makeEncrypter();
  const updtadeAcessTokenRepositoryStub = makeUpdateAccessTokenRepository();
  const sut = new AuthenticationRepository(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updtadeAcessTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updtadeAcessTokenRepositoryStub,
  };
};

describe("Authentication Repository", () => {
  test("Deve garantir a chamada do LoadAccountByEmailRepository com o email correto", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenLastCalledWith("any_email@mail.com");
  });

  test("Deve lançar um erro se o LoadAccountByEmailRepository lançar um erro", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  // test.skip("Deve retornar null se LoadAccountByEmailRepository retornar null", async () => {
  //   const { sut, loadAccountByEmailRepositoryStub } = makeSut();
  //   jest
  //     .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
  //     .mockImplementationOnce(() => {
  //       return new Promise((resolve, reject) => resolve());
  //     });
  //   const acessToken = await sut.auth(makeFakeAuthentication());
  //   expect(acessToken).toBeNull();
  // });

  test("Deve chamar o HashComparer com os valores corretos", async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, "compare");
    await sut.auth(makeFakeAuthentication());
    expect(compareSpy).toHaveBeenLastCalledWith(
      "any_password",
      "hashed_password"
    );
  });

  test("Deve lançar um erro se o HashComparer lançar um erro", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Deve retornar null se HashComparer retornar false", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const acessToken = await sut.auth(makeFakeAuthentication());
    expect(acessToken).toBeNull();
  });

  test("Deve chamar o Encrypter com o id correto", async () => {
    const { sut, encrypterStub } = makeSut();
    const generateSpy = jest.spyOn(encrypterStub, "encrypt");
    await sut.auth(makeFakeAuthentication());
    expect(generateSpy).toHaveBeenLastCalledWith("any_id");
  });

  test("Deve lançar um erro se o Encrypter lançar um erro", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Deve chamar o Encrypter com o id correto", async () => {
    const { sut } = makeSut();
    const acessToken = await sut.auth(makeFakeAuthentication());
    expect(acessToken).toBe("any_token");
  });

  test("Deve chamar o UpdateAcessTokenRepository com os valores corretos", async () => {
    const { sut, updtadeAcessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updtadeAcessTokenRepositoryStub,
      "updateAcessToken"
    );
    await sut.auth(makeFakeAuthentication());
    expect(updateSpy).toHaveBeenLastCalledWith("any_id", "any_token");
  });

  test("Deve lançar um erro se o UpdateAcessTokenRepository lançar um erro", async () => {
    const { sut, updtadeAcessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updtadeAcessTokenRepositoryStub, "updateAcessToken")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });
});
