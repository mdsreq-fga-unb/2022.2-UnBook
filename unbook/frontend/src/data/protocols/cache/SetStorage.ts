interface ISetStorage {
	set(key: string, value: string): Promise<void>;
}

export { ISetStorage };
