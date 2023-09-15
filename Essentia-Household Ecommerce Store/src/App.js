import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />}>
       
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
