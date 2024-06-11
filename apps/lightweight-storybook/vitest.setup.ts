import '@testing-library/jest-dom';
import { vi } from 'vitest';

window.ResizeObserver ??= vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
}));

window.IntersectionObserver ??= vi.fn().mockImplementation(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  taskRecords: [],
}));
