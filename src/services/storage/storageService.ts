/**
 * Interface que deve ser implementada pra usar o serviço de storage.
 */
export interface StorageService {
  getItem: <T>(key: string) => Promise<T | null>;
  setItem: <T>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

/**
 * Variável para utilizar o serviço de storage.
 */
export let storageService: StorageService;

/**
 * Função responsável por fazer a injeção da dependência.
 * @param storage dependência que deve implementar a interface `StorageService`.
 * @var `storageService` variável para utilizar o serviço de storage, recebe a dependência que foi injetada.
 */
export function initializeStorage(storage: StorageService) {
  storageService = storage;
}