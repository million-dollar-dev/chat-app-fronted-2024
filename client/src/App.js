import logo from './logo.svg';
import './App.css';
import {Outlet} from "react-router-dom";

function App() {
    return (
        <h1>
            Hello world!
            <Outlet/>
        </h1>

    );
}

export default App;
