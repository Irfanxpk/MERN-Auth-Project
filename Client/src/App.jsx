import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UserRoute from "./routes/userRoute";



const App = () => {
  return (
    <Router>
      {/* {header} */}
      <Header/>
      <Routes>
        <Route path="/*" element={ <UserRoute /> } />
      </Routes>
    </Router>
  );
};

export default App;
