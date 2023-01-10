import { ISetStorage } from "../../data/protocols/cache/SetStorage";

class LocalStorageAdapter implements ISetStorage {
	async set(key: string, value: string): Promise<void> {
		localStorage.setItem(key, value);
	}
}

export { LocalStorageAdapter };
