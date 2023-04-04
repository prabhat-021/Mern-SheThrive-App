import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.js";

export default function App() {

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Home />
    </Container>
  );
}

