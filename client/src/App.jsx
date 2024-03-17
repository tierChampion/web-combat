import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fight from "./pages/Fight";

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/fight" element={<Fight />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
