import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from "react-bootstrap/Container";
import "./index.scss";
import { store } from "./redux/store";
import { Provider } from "react-redux";


// main component (will eventually use all the others)

const MovieApp = () => {
    return (
        <Provider store={store}>
            <Container>
                <MainView />
            </Container>
        </Provider>
    );
};

// needed to find the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// this tells React to render the app in the root DOM element
root.render(<MovieApp />);
