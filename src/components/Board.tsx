import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import type { Col, Task } from "../types/types";
import Column from "./Column";
import { useContext } from "react";
import {
    setDoingsContext,
    setDonesContext,
    setTodosContext,
} from "../contexts/TasksContext";

const COLUMNS: Col[] = ["todo", "doing", "done"];

function Board() {
    const setTodos = useContext(setTodosContext);
    const setDoings = useContext(setDoingsContext);
    const setDones = useContext(setDonesContext);

    const handleDragEnd: OnDragEndResponder = (event) => {
        const { source, destination } = event;
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        if (source.droppableId === "todo") {
            let toMoveTask: Task;
            setTodos((todos) => {
                toMoveTask = { ...todos[source.index] };
                return [
                    ...todos.slice(0, source.index),
                    ...todos.slice(source.index + 1),
                ];
            });

            if (destination.droppableId === "todo") {
                setTodos((todos) => [
                    ...todos.slice(0, destination.index),
                    toMoveTask,
                    ...todos.slice(destination.index),
                ]);
                return;
            }

            if (destination.droppableId === "doing") {
                setDoings((doings) => [
                    ...doings.slice(0, destination.index),
                    toMoveTask,
                    ...doings.slice(destination.index),
                ]);
                return;
            }

            if (destination.droppableId === "done") {
                setDones((dones) => [
                    ...dones.slice(0, destination.index),
                    toMoveTask,
                    ...dones.slice(destination.index),
                ]);
                return;
            }
        }

        if (source.droppableId === "doing") {
            let toMoveTask: Task;
            setDoings((doings) => {
                toMoveTask = { ...doings[source.index] };
                return [
                    ...doings.slice(0, source.index),
                    ...doings.slice(source.index + 1),
                ];
            });

            if (destination.droppableId === "doing") {
                setDoings((doings) => [
                    ...doings.slice(0, destination.index),
                    toMoveTask,
                    ...doings.slice(destination.index),
                ]);
                return;
            }

            if (destination.droppableId === "todo") {
                setTodos((todos) => [
                    ...todos.slice(0, destination.index),
                    toMoveTask,
                    ...todos.slice(destination.index),
                ]);
                return;
            }

            if (destination.droppableId === "done") {
                setDones((dones) => [
                    ...dones.slice(0, destination.index),
                    toMoveTask,
                    ...dones.slice(destination.index),
                ]);
                return;
            }
        }

        if (source.droppableId === "done") {
            let toMoveTask: Task;
            setDones((dones) => {
                toMoveTask = { ...dones[source.index] };
                return [
                    ...dones.slice(0, source.index),
                    ...dones.slice(source.index + 1),
                ];
            });

            if (destination.droppableId === "done") {
                setDones((dones) => [
                    ...dones.slice(0, destination.index),
                    toMoveTask,
                    ...dones.slice(destination.index),
                ]);
                return;
            }

            if (destination.droppableId === "todo") {
                setTodos((todos) => [
                    ...todos.slice(0, destination.index),
                    toMoveTask,
                    ...todos.slice(destination.index),
                ]);
                return;
            }

            if (destination.droppableId === "doing") {
                setDoings((doings) => [
                    ...doings.slice(0, destination.index),
                    toMoveTask,
                    ...doings.slice(destination.index),
                ]);
                return;
            }
        }
    };

    return (
        <div className="flex gap-8">
            <DragDropContext onDragEnd={handleDragEnd}>
                {COLUMNS.map((column) => (
                    <Column key={column} title={column} />
                ))}
            </DragDropContext>
        </div>
    );
}

export default Board;
