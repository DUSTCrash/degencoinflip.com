import { useCallback, useState } from 'react';
export function useLocalStorage(key, defaultState) {
    const [value, setValue] = useState(() => {
        if (typeof localStorage === 'undefined')
            return defaultState;
        const value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : defaultState;
        }
        catch (error) {
            console.warn(error);
            return defaultState;
        }
    });
    const setLocalStorage = useCallback((newValue) => {
        if (newValue === value)
            return;
        setValue(newValue);
        if (newValue === null) {
            localStorage.removeItem(key);
        }
        else {
            try {
                localStorage.setItem(key, JSON.stringify(newValue));
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [value, setValue, key]);
    return [value, setLocalStorage];
}
//# sourceMappingURL=useLocalStorage.js.map