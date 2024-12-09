import "./App.css";
import Home from "./components/Home";
import Footer from "./components/master/Footer";
import Navbar from "./components/master/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import SearchResults from "./components/SearchResults";
import Jobs from "./components//jobsScreen/Jobs";
import Workers from "./components/workersScreen/Workers";
import Signin from "./components/auth/Signin";
import WorkersDetail from "./components/workersScreen/WorkersDetail";
import JobsDetail from "./components//jobsScreen/JobsDetail";
import CreateNewAccount from "./components/auth/CreateNewAccount";
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/resetPassword/ForgetPassword";
import VerifyNumber from "./components/auth/VerifyNumber";
import Message from "./components/messages/Message";
import PostJob from "./components/PostJob";
import MyJobs from "../src/components/MyJobs";
import ResetPassword from "./components/resetPassword/ResetPassword";

//function that chect if user is logged in or not
const isUserLoggedIn = () => {
  let isLoggedIn = localStorage.getItem("token");
  return isLoggedIn === null ? false : true;
};
//Public routes function
const PublicRoutes = ({ children }) => {
  return isUserLoggedIn() ? <Navigate to={"/dashboard"} /> : children;
};
//Protected routes function
const PrivateRoutes = ({ children }) => {
  return isUserLoggedIn() ? children : <Navigate to={"/"} />;
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        {/* Other routes */}
        <Route path="/workers/:userId" element={<WorkersDetail />}></Route>
          <Route path="/job/:jobName/:jobId" element={<JobsDetail />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/workers" element={<Workers />}></Route>
          <Route
            path="/search/:type/:query"
            element={<SearchResults />}
          ></Route>

        {/* Public routes */}
          <Route
            path="/auth/signin"
            element={
              <PublicRoutes>
                <Signin />
              </PublicRoutes>
            }
          ></Route>
          <Route
            path="/auth/create-new-account"
            element={
              <PublicRoutes>
                <CreateNewAccount />
              </PublicRoutes>
            }
          ></Route>
          <Route
            path="/auth/forget-password"
            element={
              <PublicRoutes>
                <ForgetPassword />
              </PublicRoutes>
            }
          ></Route>
          <Route
            path="auth/verify-number"
            element={
              <PublicRoutes>
                <VerifyNumber />
              </PublicRoutes>
            }
          ></Route>
          <Route
            path="auth/reset-password"
            element={
              <PublicRoutes>
                <ResetPassword />
              </PublicRoutes>
            }
          ></Route>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Home />
              </PublicRoutes>
            }
          ></Route>
         
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />

          <Route
            path="/message"
            element={
              <PrivateRoutes>
                <Message />
              </PrivateRoutes>
            }
          />

          <Route
            path="/post-job"
            element={
              <PrivateRoutes>
                <PostJob />
              </PrivateRoutes>
            }
          />

          <Route
            path="/my-jobs"
            element={
              <PrivateRoutes>
                <MyJobs />
              </PrivateRoutes>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
