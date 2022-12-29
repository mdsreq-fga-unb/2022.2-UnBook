interface ITokenGenerator {
  generate(id: string): Promise<string>;
}

export { ITokenGenerator };
