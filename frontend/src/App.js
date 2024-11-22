// import logo from './logo.svg';
// import './App.css';
import { Navbar } from "./components/Navbar";
import { Container } from "@mui/material";
import { TaskManager } from "./components/TaskManager";

const App = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <TaskManager />
      </Container>
    </>
  );
};

export default App;
