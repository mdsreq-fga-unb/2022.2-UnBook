interface IEncrypter {
  encrypt(value: string): Promise<string>;
}

export { IEncrypter };
