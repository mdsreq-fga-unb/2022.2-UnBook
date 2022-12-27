interface IEncrypter {
  encrypt(password: string): Promise<string>;
}

export { IEncrypter };
