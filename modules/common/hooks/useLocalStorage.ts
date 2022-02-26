import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocalStorage = (key: string) => {
  // Initialize the value from localStorage
  const [currentValue, setCurrentValue] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem(key) : null
  );

  // On every render, re-subscribe to the storage event
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setCurrentValue(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("storage", handler);
    };
  });

  // Update localStorage when the currentValue changes via setCurrentValue
  useEffect(() => {
    if (currentValue) {
      localStorage.setItem(key, currentValue);
    }
  }, [key, currentValue]);

  // Use as const to tell TypeScript this is a tuple
  return [currentValue, setCurrentValue] as const;
};
