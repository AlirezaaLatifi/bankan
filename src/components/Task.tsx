import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
import type { Col, Task } from "../types/types";
import {
    ChangeEvent,
    FocusEvent,
    RefObject,
    useContext,
    useRef,
    useState,
} from "react";
import useAutosizeTextArea from "../customHooks/useAutosizeTextarea";
import useRelatedContextSetter from "../customHooks/useRelatedContextSetter";
import { setDonesContext, setTodosContext } from "../contexts/TasksContext";

export interface Props {
    task: Task;
    parentColumn: Col;
    index: number;
    isLastTask: boolean;
    lastTaskTextareaRef: RefObject<HTMLTextAreaElement>;
}

function Task({
    task,
    parentColumn,
    index,
    isLastTask,
    lastTaskTextareaRef,
}: Props) {
    const [isChecked, setIsChecked] = useState(() =>
        parentColumn === "done" ? true : false,
    );
    const [inputText, setInputText] = useState(task.content);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, inputText);
    const [setTasks] = useRelatedContextSetter(parentColumn);
    const setTodos = useContext(setTodosContext);
    const setDones = useContext(setDonesContext);

    const [containerClassNames, labelClassNames, textareaClassNames] =
        getTaskStyles(parentColumn, isChecked);

    const handleCheckmark = () => {
        if (parentColumn === "todo" || parentColumn === "doing") {
            setTasks((prevTasks) =>
                prevTasks.filter((prevTask) => prevTask.id !== task.id),
            );

            setDones((prevDones) => [
                ...prevDones,
                { id: task.id, content: task.content },
            ]);
        } else {
            setTasks((prevTasks) =>
                prevTasks.filter((prevTask) => prevTask.id !== task.id),
            );

            setTodos((prevTodos) => [
                ...prevTodos,
                { id: task.id, content: task.content },
            ]);
        }

        setIsChecked(!isChecked);
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target?.value);
    };

    const handleSaveOnBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
        if (!event.target.value) {
            setTasks((prev) =>
                prev.filter((prevTask) => prevTask.id !== task.id),
            );
            return;
        }
        if (event.target.value === task.content) return;

        setTasks((prev) => {
            return prev.map((prevTask) =>
                prevTask.id !== task.id
                    ? prevTask
                    : { id: task.id, content: event.target.value },
            );
        });
    };

    const handleTaskDelete = () => {
        setTasks((prevTasks) =>
            prevTasks.filter((prevTask) => prevTask.id !== task.id),
        );
    };

    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    data-testId={"task-container"}
                    data-count={index}
                    className={
                        containerClassNames +
                        ` ${
                            snapshot.isDragging
                                ? "border-dashed border-black"
                                : ""
                        }`
                    }
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <div className="relative mr-3">
                        <input
                            id={`${task.id}`}
                            type="checkbox"
                            className="opacity-0"
                        />
                        <label
                            data-testid="checkbox-label"
                            htmlFor={`${task.id}`}
                            className={labelClassNames}
                            onClick={handleCheckmark}
                        ></label>
                    </div>
                    <textarea
                        className={textareaClassNames}
                        onChange={handleChange}
                        ref={isLastTask ? lastTaskTextareaRef : textAreaRef}
                        rows={1}
                        value={inputText}
                        onBlur={handleSaveOnBlur}
                    />
                    <button
                        type="button"
                        className="opacity-0 p-2 text-red-300 text-xl group-hover:opacity-100 hover:text-red-600 transition-all"
                        onClick={handleTaskDelete}
                    >
                        X
                    </button>
                </div>
            )}
        </Draggable>
    );
}

function getTaskStyles(parentColumn: Col, isChecked: boolean) {
    const containerClassNames = classNames(
        "group px-4 py-5 border flex gap-4 items-center bg-white hover:cursor-pointer",
        {
            "border-todo-200": parentColumn === "todo",
            "border-doing-200": parentColumn === "doing",
            "border-done-200": parentColumn === "done",
        },
    );
    const labelClassNames = classNames(
        "absolute top-0 left-0 w-7 h-7 block border hover:cursor-pointer",
        {
            "border-todo-200": parentColumn === "todo",
            "border-doing-200": parentColumn === "doing",
            "border-done-200": parentColumn === "done",
            "before:content-['\\2713'] before:block before:absolute before:-top-1 before:left-[1px] before:text-2xl":
                isChecked,
            "before:text-todo-400": parentColumn === "todo",
            "before:text-doing-400": parentColumn === "doing",
            "before:text-done-400": parentColumn === "done",
        },
    );

    const textareaClassNames = classNames(
        "text-task font-semibold w-full bg-white resize-none focus:outline-none text-wrap",
        { "line-through": parentColumn === "done" },
    );

    return [containerClassNames, labelClassNames, textareaClassNames];
}

export default Task;
