interface IDecrypter {
  decrypt(value: string): Promise<string>;
}

export { IDecrypter };
