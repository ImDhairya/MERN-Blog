import "./App.css";
import {Route} from "react-router-dom";
import Post from "./Post";
import {Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import {UserContextProvider} from "./UserContext.jsx";
import CreatePost from "./pages/CreatePost.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<IndexPage />}
            />

            <Route
              path={"/login"}
              element={<LoginPage />}
            />
            <Route
              path={"/register"}
              element={<RegisterPage />}
            />
            <Route
              path="/create"
              element={<CreatePost />}
            />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
