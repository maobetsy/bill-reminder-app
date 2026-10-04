import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load once on mount. Reading localStorage is the one case where setting
  // state inside an effect is correct: localStorage doesn't exist on the
  // server, so it can only be read after the component mounts in the browser.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      // Corrupt or unreadable data: keep the initial value.
    }
    setIsLoaded(true);
  }, [key]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Only save after the first load, so the empty initial value
  // can never overwrite what's already stored.
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, isLoaded]);

  return [value, setValue] as const;
}