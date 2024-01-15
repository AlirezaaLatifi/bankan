import Board from "./components/Board";
import Header from "./components/Header";

function App() {
    return (
        <div className="w-11/12 max-w-[1200px] mx-auto min-h-screen grid grid-rows-[auto_1fr] py-[8rem] md:pt-20 ">
            <Header />
            <Board />
        </div>
    );
}

export default App;
