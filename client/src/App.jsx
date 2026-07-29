import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SelectRole from "./pages/SelectRole";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Transcript from "./pages/Transcript";


function App() {
  return (
    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/select-role" element={<SelectRole />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/result" element={<Result />} />

        <Route path="/history" element={<History />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/transcript/:id" element={<Transcript />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;