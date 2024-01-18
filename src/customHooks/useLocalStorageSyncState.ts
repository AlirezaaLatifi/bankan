import { useEffect, useState } from "react";
import { Col } from "../types/types";

const computeInitialValue = (key: Col, fallbackValue: object[]) => {
    // localStorage.clear();
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
};

const useLocalStorageSyncState = (key: Col, fallbackInitialValue = []) => {
    const [state, setState] = useState(
        computeInitialValue(key, fallbackInitialValue),
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export default useLocalStorageSyncState;
