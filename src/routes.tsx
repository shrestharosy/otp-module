import { Routes, Route } from 'react-router-dom';
import { routes } from './constants';
import Home from './pages';
import Success from './pages/success';

function Main() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path={routes.SUCCESS} element={<Success />} />
        </Routes>
    );
}

export default Main;
