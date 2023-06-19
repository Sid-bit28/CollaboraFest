import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Error, Landing } from './pages';
import {
    AddEvent,
    AllEvents,
    Profile,
    Stats,
    SharedLayout,
} from './pages/dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<AllEvents />}></Route>
                    <Route path="stats" element={<Stats />}></Route>
                    <Route path="add-event" element={<AddEvent />}></Route>
                    <Route path="profile" element={<Profile />}></Route>
                </Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/landing" element={<Landing />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
