import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UserRoute from "./routes/userRoute";
import AdminRoute from "./routes/adminRoute";

// import adminRoute from "./routes/adminRoute";


const App = () => {
  return (
    <Router>
      {/* {header} */}
      <Header/>
      <Routes>
        <Route path="/*" element={ <UserRoute /> } />
        <Route path="/admin/*" element={<AdminRoute/> } />
      </Routes>
    </Router>
  );
};

export default App;
