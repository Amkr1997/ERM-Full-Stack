import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedirectView from "./pages/RedirectView";
import Navbar from "./components/others/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EngineerView from "./pages/EngineerView";
import ManagerView from "./pages/MangerView";
import PrivateElement from "./components/others/PrivateElement";
import RefreshHandler from "./components/others/RefreshHandler";
import NewProject from "./pages/NewProject";
import NewAssignment from "./pages/NewAssignment";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/Updateprofile";
import EngineersPage from "./pages/EngineersPage";
import DisplayProjects from "./pages/DisplayProjects";
import DisplayAssignments from "./pages/DisplayAssignments";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <section>
          <RefreshHandler />
          <Routes>
            <Route path="/" element={<RedirectView />} />
            <Route
              path="/engineer/view"
              element={<PrivateElement element={<EngineerView />} />}
            />
            <Route
              path="/manager/view"
              element={<PrivateElement element={<ManagerView />} />}
            />
            <Route
              path="/profile"
              element={<PrivateElement element={<Profile />} />}
            />
            <Route
              path="/new/project"
              element={<PrivateElement element={<NewProject />} />}
            />
            <Route
              path="/new/assignment"
              element={<PrivateElement element={<NewAssignment />} />}
            />
            <Route
              path="/update/profile"
              element={<PrivateElement element={<UpdateProfile />} />}
            />
            <Route
              path="/engineers/page"
              element={<PrivateElement element={<EngineersPage />} />}
            />
            <Route
              path="/projects/page"
              element={<PrivateElement element={<DisplayProjects />} />}
            />
            <Route
              path="/assignments/page"
              element={<PrivateElement element={<DisplayAssignments />} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
};

export default App;
