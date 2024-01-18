import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TasksProvider } from "./contexts/TasksContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <TasksProvider>
        <App />
    </TasksProvider>,
);
