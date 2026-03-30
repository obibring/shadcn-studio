export async function register() {
  if (typeof window === 'undefined' && typeof globalThis.localStorage !== 'undefined') {
    // Node.js 25+ exposes a broken localStorage global (no getItem/setItem methods)
    // when --localstorage-file is not properly configured. Provide a no-op polyfill
    // to prevent server-side crashes from libraries that access localStorage during SSR.
    const store = new Map<string, string>()

    globalThis.localStorage = {
      getItem(key: string) {
        return store.get(key) ?? null
      },
      setItem(key: string, value: string) {
        store.set(key, String(value))
      },
      removeItem(key: string) {
        store.delete(key)
      },
      clear() {
        store.clear()
      },
      get length() {
        return store.size
      },
      key(index: number) {
        return [...store.keys()][index] ?? null
      }
    } as Storage
  }
}
