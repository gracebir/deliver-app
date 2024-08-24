/** @format */

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ProtectedPage from "./pages/protectedPage";

function App() {
    return (
        <div className='font-poppins'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedPage>
                            <Home />
                        </ProtectedPage>
                    }
                />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
