import { BrowserRouter, Routes, Route } from "react-router-dom"
import Lobby from "./pages/Lobby";
import Arena from "./pages/Arena";
import Waiting from "./pages/Waiting";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/arena" element={<Arena />}></Route>
                <Route path="/" element={<Lobby />}></Route>
                <Route path="/waiting" element={<Waiting />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
