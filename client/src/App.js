import './App.css';
import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import websocketService from "./services/websocket";
import {Toaster} from "react-hot-toast";
import { Provider } from "react-redux";
import {store} from "./redux/store";

function App() {
    useEffect(() => {
        websocketService.connect('ws://140.238.54.136:8080/chat/chat');
    }, []);
    return (
        <Provider store={store}>
            <Toaster/>
            <main>
                <Outlet/>
            </main>
        </Provider>
    );
}

export default App;
