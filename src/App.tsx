// import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from './pages/user/Signup';
import  SignInPage  from './pages/user/SignIn';
import Car from './pages/services/carparkventilation/Car';
import Duct from './pages/services/ductsize/duct';
import Home from './pages/homepage/home/home'
import About from "./pages/about/components/About";
import ContactUs from "./pages/contact-us/ContactUs";
import Refrigerant from "./pages/services/refrigerant/Refrigerant";
import Pipe from "./pages/services/pipesizer/Pipe";
function App() {
  return (

     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/car-park-ventilation" element={<Car />} />
            <Route path="/duct-size-calculation" element={<Duct />} />
            <Route path="/refrigerant-charge-calculation" element = {<Refrigerant/>} />
            <Route path="/pipe-size-calculation" element={<Pipe/>}/>
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/about-us" element={<About/>} />
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;