import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbars/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RenderNews from "./pages/RenderNews";
import NewsDetail from "./pages/NewsDetail";
import SignUp from "./pages/Signup";
import Categories from "./pages/category/Categories";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/categories">
          <Route path="" element={<Categories />}></Route>
          <Route path=":name" element={<RenderNews />}></Route>
        </Route>
        <Route path="/news" element={<RenderNews />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
