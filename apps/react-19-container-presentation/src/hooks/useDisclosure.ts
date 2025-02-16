import { useState, useCallback } from 'react';

export function useDisclosure() {
  const [opened, setOpened] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  const set = useCallback((next: boolean) => {
    setOpened(next);
  }, []);

  return [opened, { open, close, toggle, set }] as const;
}
