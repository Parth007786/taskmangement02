import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import PrivateRoute from "./components/PrivateRoute";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<PrivateRoute />}> */}
          <Route path="/dash" element={<Dashboard />} />
          {/* </Route> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
