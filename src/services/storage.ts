type StorageKey = 'userToken'

export interface IStorageService {
  set(key: StorageKey, item: unknown): void
  get<T>(key: StorageKey): T | null
  remove(key: StorageKey): void
}

class StorageService implements IStorageService {
  constructor(private storage: Storage) {}

  set(key: StorageKey, value: unknown): void {
    return this.storage.setItem(key, JSON.stringify(value))
  }

  get(key: StorageKey) {
    const storageValue = this.storage.getItem(key)

    return storageValue ? JSON.parse(storageValue) : null
  }

  remove(key: StorageKey): void {
    return this.storage.removeItem(key)
  }
}

export const storage: IStorageService = new StorageService(window.localStorage)
