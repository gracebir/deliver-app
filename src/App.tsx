/** @format */

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ProtectedPage from "./pages/protectedPage";
import RequestDetail from "./pages/RequestDetail";

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
                <Route
                    path='/request/:id'
                    element={
                        <ProtectedPage>
                            <RequestDetail />
                        </ProtectedPage>
                    }
                />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
