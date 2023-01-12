interface ISaveAccessToken {
	save(accessToken: string): Promise<void>;
}

export { ISaveAccessToken };
