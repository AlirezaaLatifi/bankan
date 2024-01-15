import {
    Context,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useState,
} from "react";
import type { Col, Task } from "../types/types";

const todosContext = createContext<Task[]>([]);
const setTodosContext = createContext<Dispatch<SetStateAction<Task[]>>>(
    () => {},
);

const doingsContext = createContext<Task[]>([]);
const setDoingsContext = createContext<Dispatch<SetStateAction<Task[]>>>(
    () => {},
);

const donesContext = createContext<Task[]>([]);
const setDonesContext = createContext<Dispatch<SetStateAction<Task[]>>>(
    () => {},
);

/****
 *** Provider
 ****/

function TasksProvider({ children }: PropsWithChildren) {
    const [todos, setTodos] = useState<Task[]>([
        { id: "1", content: "this is test task" },
        { id: "2", content: "another test task" },
    ]);
    const [doings, setDoings] = useState<Task[]>([
        {
            id: "3",
            content:
                "this is a long test message to see auto size functionality.",
        },
        { id: "4", content: "another test task" },
    ]);
    const [dones, setDones] = useState<Task[]>([
        { id: "5", content: "this is test task" },
        { id: "6", content: "another test task" },
    ]);

    console.log(todos);

    return (
        <todosContext.Provider value={todos}>
            <setTodosContext.Provider value={setTodos}>
                <doingsContext.Provider value={doings}>
                    <setDoingsContext.Provider value={setDoings}>
                        <donesContext.Provider value={dones}>
                            <setDonesContext.Provider value={setDones}>
                                {children}
                            </setDonesContext.Provider>
                        </donesContext.Provider>
                    </setDoingsContext.Provider>
                </doingsContext.Provider>
            </setTodosContext.Provider>
        </todosContext.Provider>
    );
}

/****
 *** Helpers
 ****/

function selectContextValueObject(columnTitle: Col) {
    let relatedContextObj: React.Context<Task[]>;
    switch (columnTitle) {
        case "todo":
            relatedContextObj = todosContext;
            break;
        case "doing":
            relatedContextObj = doingsContext;
            break;
        case "done":
            relatedContextObj = donesContext;
            break;
    }

    return relatedContextObj;
}

function selectContextSetterObject(columnTitle: Col) {
    let relatedContextObj: Context<Dispatch<SetStateAction<Task[]>>>;
    switch (columnTitle) {
        case "todo":
            relatedContextObj = setTodosContext;
            break;
        case "doing":
            relatedContextObj = setDoingsContext;
            break;
        case "done":
            relatedContextObj = setDonesContext;
            break;
    }

    return relatedContextObj;
}

export {
    setTodosContext,
    setDoingsContext,
    setDonesContext,
    TasksProvider,
    selectContextValueObject,
    selectContextSetterObject,
};
