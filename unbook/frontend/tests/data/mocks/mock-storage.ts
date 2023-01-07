import { ISetStorage } from "../../../src/data/protocols/cache/SetStorage";

class SetStorageSpy implements ISetStorage {
	key: string;
	value: string;
	async set(key: string, value: string): Promise<void> {
		this.key = key;
		this.value = value;
	}
}

export { SetStorageSpy };
