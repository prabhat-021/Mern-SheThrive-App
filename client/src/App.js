import { Container } from "@material-ui/core";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails.jsx";

export default function App() {

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts"/>} />
        </Routes>
      </Container>
    </BrowserRouter>

  );
}

