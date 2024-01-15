import { useContext } from "react";
import type { Col } from "../types/types";
import { selectContextValueObject } from "../contexts/TasksContext";

function useRelatedContext(columnTitle: Col) {
    const tasks = useContext(selectContextValueObject(columnTitle));
    return [tasks];
}

export default useRelatedContext;
