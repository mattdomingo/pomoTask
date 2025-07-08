import { describe, it, expect, beforeEach } from 'vitest';
import { save, load } from '../src/utils/storage';

// Mock localStorage since it's not available in the test environment by default.
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save a value to localStorage', () => {
    const key = 'test-key';
    const value = { a: 1, b: 'test' };
    save(key, value);
    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  it('should load a value from localStorage', () => {
    const key = 'test-key';
    const value = { a: 1, b: 'test' };
    localStorage.setItem(key, JSON.stringify(value));
    const loadedValue = load(key, null);
    expect(loadedValue).toEqual(value);
  });

  it('should return the fallback value if the key does not exist', () => {
    const key = 'non-existent-key';
    const fallback = { a: 'default' };
    const loadedValue = load(key, fallback);
    expect(loadedValue).toEqual(fallback);
  });

  it('should return the fallback value if localStorage contains invalid JSON', () => {
    const key = 'corrupted-key';
    localStorage.setItem(key, 'this is not valid json');
    const fallback = { b: 'fallback' };
    const loadedValue = load(key, fallback);
    expect(loadedValue).toEqual(fallback);
  });
}); 