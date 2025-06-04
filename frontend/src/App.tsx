import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/others/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EngineerView from "./pages/EngineerView";
import ManagerView from "./pages/MangerView";
import PrivateElement from "./components/others/PrivateElement";
import RefreshHandler from "./components/others/RefreshHandler";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <section>
          <RefreshHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/engineer/view"
              element={<PrivateElement element={<EngineerView />} />}
            />
            <Route
              path="/manager/view"
              element={<PrivateElement element={<ManagerView />} />}
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
