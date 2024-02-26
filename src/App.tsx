import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from './pages/user/Signup';
import  SignInPage  from './pages/user/SignIn';
import Dashboard from './pages/homepage/home';
function App() {
  return (

     <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </BrowserRouter>

  );
}

export default App;