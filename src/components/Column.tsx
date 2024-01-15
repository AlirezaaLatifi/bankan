import { v4 as uuidv4 } from "uuid";
import { useContext, useRef } from "react";
import useRelatedContext from "../customHooks/useRelatedContextValue.ts";
import { toCapitalCaseWord } from "../helpers/helpers";
import type { Col } from "../types/types";
import Task from "./Task";
import classNames from "classnames";
import { setTodosContext } from "../contexts/TasksContext.tsx";
interface Props {
    title: Col;
}

function Column({ title }: Props) {
    const [tasks] = useRelatedContext(title);
    const setTodo = useContext(setTodosContext);
    const [containerClassNames, titleClassNames, tasksCounterClassNames] =
        getColumnStyles(title);
    const lastTaskTextareaRef = useRef<HTMLTextAreaElement>(null);
    const focusTimeoutRef = useRef<number>();

    const handleNewTask = () => {
        focusTimeoutRef.current && clearTimeout(focusTimeoutRef.current);
        setTodo([...tasks, { id: uuidv4(), content: "" }]);
        focusTimeoutRef.current = setTimeout(() => {
            lastTaskTextareaRef.current!.focus();
        }, 100);
    };

    return (
        <div className={containerClassNames}>
            <header className="flex justify-between items-center mb-10">
                <h2 className={titleClassNames}>{toCapitalCaseWord(title)}</h2>
                <p className={tasksCounterClassNames}>{tasks.length} Tasks</p>
            </header>
            <div className="grid gap-4 mb-6">
                {tasks.map((task, index, tasks) => (
                    <Task
                        key={task.id}
                        task={task}
                        parentColumn={title}
                        lastTaskTextareaRef={lastTaskTextareaRef}
                        isLastTask={index === tasks.length - 1}
                    />
                ))}
            </div>
            {title === "todo" && (
                <button
                    type="button"
                    className="px-4 text-addTask text-todo-400/50 hover:text-todo-400 transition-colors"
                    onClick={handleNewTask}
                >
                    + New
                </button>
            )}
        </div>
    );
}

function getColumnStyles(title: Col) {
    const colContainerClassNames = classNames("basis-1/3 rounded-2xl p-8", {
        "bg-todo-100": title === "todo",
        "bg-doing-100": title === "doing",
        "bg-done-100": title === "done",
    });

    const colTitleClassNames = classNames("text-colHeading font-semibold", {
        "text-todo-400": title === "todo",
        "text-doing-400": title === "doing",
        "text-done-400": title === "done",
    });

    const tasksCounterClassNames = classNames("text-taskCount font-medium", {
        "text-todo-300": title === "todo",
        "text-doing-300": title === "doing",
        "text-done-300": title === "done",
    });

    return [colContainerClassNames, colTitleClassNames, tasksCounterClassNames];
}

export default Column;
