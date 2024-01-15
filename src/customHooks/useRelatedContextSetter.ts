import { useContext } from "react";
import type { Col } from "../types/types";
import { selectContextSetterObject } from "../contexts/TasksContext";

function useRelatedContextSetter(columnTitle: Col) {
    const setTasks = useContext(selectContextSetterObject(columnTitle));
    return [setTasks];
}

export default useRelatedContextSetter;
