import { BrowserRouter, Routes, Route } from "react-router-dom"
import Lobby from "./pages/Lobby";
import MultiplayerArena from "./pages/MultiplayerArena";
import Waiting from "./pages/Waiting";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/multiplayerarena" element={<MultiplayerArena />}></Route>
                <Route path="/" element={<Lobby />}></Route>
                <Route path="/waiting" element={<Waiting />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
