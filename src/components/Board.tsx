import type { Col } from "../types/types";
import Column from "./Column";

const COLUMNS: Col[] = ["todo", "doing", "done"];

function Board() {
    return (
        <div className="flex gap-8">
            {COLUMNS.map((column, index) => (
                <Column key={index} title={column} />
            ))}
        </div>
    );
}

export default Board;
