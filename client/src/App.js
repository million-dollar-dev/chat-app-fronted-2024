import './App.css';
import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import websocketService from "./services/websocket";
import {Toaster} from "react-hot-toast";

function App() {
    useEffect(() => {
        websocketService.connect('ws://140.238.54.136:8080/chat/chat');
    }, []);
    return (
        <>
            <Toaster/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default App;
