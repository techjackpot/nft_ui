import Container from 'react-bootstrap/Container';
import MintButton from "./components/MintButton/MintButton";

function App() {
  return (
    <div className="App">
        <Container className="min-vh-100">
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <MintButton />
            </div>
        </Container>
    </div>
  );
}

export default App;
