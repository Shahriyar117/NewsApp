import NavBar from "./components/navbars/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RenderNews from "./pages/RenderNews";
import SignUp from "./pages/Signup";
import Categories from "./pages/category/Categories";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./components/footer/Footer";

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
            path=":name"
            element={
              <ProtectedRoute>
                <RenderNews />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <RenderNews />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user && <Footer />}
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
