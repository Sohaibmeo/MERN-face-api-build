import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import {Home, AddNew, Attendance} from './pages'
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes className="container">
          <Route exact path="/" Component={Home} />
          <Route exact path="/new-member" Component={AddNew} />
          <Route exact path="/attendance" Component={Attendance} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;