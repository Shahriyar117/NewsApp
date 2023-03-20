import NavBar from "./components/navbars/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AllNews from "./pages/allnews/AllNews";
import SignUp from "./pages/signup/Signup";
import Categories from "./pages/category/Categories";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserFooter from "./components/footer/UserFooter";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./components/footer/Footer";
import TopHeadlines from "./pages/topheadlines/TopHeadlines";
import TheNews from "./pages/thenews/TheNews";

const App = ({ user }) => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/categories">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path=":category"
            element={
              <ProtectedRoute>
                <AllNews />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <TheNews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topNews"
          element={
            <ProtectedRoute>
              <TopHeadlines />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user ? <UserFooter /> : <Footer />}
    </>
  );
};
const msp = ({ auth }) => ({
  user: auth.user,
});
const mdp = (dispatch) => ({});

export default connect(msp, mdp)(App);

// function withRouter(Component) {
// 	function ComponentWithRouterProp(props) {
// 		let location = useLocation();
// 		let navigate = useNavigate();
// 		let params = useParams();
// 		return <Component {...props} router={{ location, navigate, params }} />;
// 	}

// 	return ComponentWithRouterProp;
// }
