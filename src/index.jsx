import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from "react-bootstrap/Container";
import "./index.scss";

// statement to indicated that you need to bundle `./index.scss`
import "./index.scss";

// main component (will eventually use all the others)
// const MyFlixApplication = () => {
//     return (
//         <div className="my-flix">
//             <div>Good morning</div>
//         </div>
//     );
// };

const MovieApp = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// needed to find the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// this tells React to render the app in the root DOM element
root.render(<MovieApp />);
