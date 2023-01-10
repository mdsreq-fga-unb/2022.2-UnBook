interface IUpdateAccessTokenRepository {
  updateAcessToken(id: string, token: string): Promise<void>;
}

export { IUpdateAccessTokenRepository };
