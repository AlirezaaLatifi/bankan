import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { Props } from "../Task";
import { useRef } from "react";
import { TasksProvider } from "../../contexts/TasksContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Task from "../Task";

type WrapperProps = Pick<
    Props,
    "task" | "index" | "isLastTask" | "parentColumn"
>;

const task = {
    id: "testIdForTask",
    content: "this is a test task.",
};

//TODO : is there any better solution for mocking ref?
function WrappedTask(props: WrapperProps) {
    const ref = useRef(null);

    return (
        <TasksProvider>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="todo">
                    {() => <Task lastTaskTextareaRef={ref} {...props} />}
                </Droppable>
            </DragDropContext>
        </TasksProvider>
    );
}

it("renders content of task and a checkbox.", () => {
    render(
        <WrappedTask
            task={task}
            index={1}
            isLastTask={false}
            parentColumn="todo"
        />,
    );
    const textarea = screen.getByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const checkboxLabel = screen.getByTestId("checkbox-label");

    expect(textarea).toHaveTextContent(task.content);
    expect(checkbox).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
});

it("user can check and uncheck the checkbox", () => {
    render(
        <WrappedTask
            task={task}
            index={1}
            isLastTask={false}
            parentColumn="todo"
        />,
    );

    // const checkboxLabel = screen.getByTestId("checkbox-label");
    // expect(checkboxLabel).haveBe;
});

it("users can see deleteBtn on hovering over task.", async () => {
    const user = userEvent.setup();
    render(
        <WrappedTask
            task={task}
            index={1}
            isLastTask={false}
            parentColumn="todo"
        />,
    );

    const taskContainer = screen.getByTestId("task-container");
    const deleteBtn = screen.getByText(/x/i);
    expect(deleteBtn).toHaveStyle(`opacity: "0"`);

    await user.hover(taskContainer);
    expect(deleteBtn).toHaveStyle(`opacity: "100`);
});

it("user can edit content of the task by clicking on it and typing.", async () => {
    const user = userEvent.setup();
    render(
        <WrappedTask
            task={task}
            index={1}
            isLastTask={false}
            parentColumn="todo"
        />,
    );

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "new test task");
    expect(textarea).toHaveTextContent("new test task");
});
