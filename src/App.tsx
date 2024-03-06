import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from './pages/user/Signup';
import  SignInPage  from './pages/user/SignIn';
import Car from './pages/carparkventilation/Car';
import Duct from './pages/ductsize/duct';
import Home from './pages/homepage/home';
function App() {
  return (

     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/car-park-ventilation" element={<Car />} />
            <Route path="/duct-size-calculation" element={<Duct />} />
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;