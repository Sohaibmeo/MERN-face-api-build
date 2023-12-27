import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Home, AddNew, Attendance, Login } from './pages';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/new-member" element={<AddNew />} />
          <Route exact path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
