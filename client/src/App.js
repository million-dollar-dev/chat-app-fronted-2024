import './App.css';
import {Outlet} from "react-router-dom";

function App() {
    return (
        <h1>
            <Outlet/>
        </h1>

    );
}

export default App;
