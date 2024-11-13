export interface IStorageService {
  set(title: string, item: string): void
  get<T>(title: string): T
  remove(key: string): void
}

class StorageService implements IStorageService {
  constructor(private storage: Storage) {}

  set(key: string, value: unknown): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  get(key: string) {
    const storageValue = this.storage.getItem(key)

    return storageValue ? JSON.parse(storageValue) : null
  }

  remove(key: string): void {
    return this.storage.removeItem(key)
  }
}

export const storage = new StorageService(window.localStorage)
