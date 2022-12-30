interface IUpdateAccessTokenRepository {
  update(id: string, token: string): Promise<void>;
}

export { IUpdateAccessTokenRepository };
