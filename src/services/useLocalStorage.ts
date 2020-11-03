// credits: https://typeofnan.dev/using-local-storage-in-react-with-your-own-custom-uselocalstorage-hook/

import { useState, useEffect } from 'react'

export const useLocalStorage = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const [value, setValue] = useState<any>(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, setValue])
}
