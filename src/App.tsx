import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from './pages/user/Signup';
import  SignInPage  from './pages/user/SignIn';
import Dashboard from './pages/homepage/home';
import Car from './pages/carparkventilation/Car';
import Duct from './pages/ductsize/duct';
function App() {
  return (

     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/car-park-ventilation" element={<Car />} />
            <Route path="/duct-size-calculation" element={<Duct />} />
            <Route path="/singin" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;