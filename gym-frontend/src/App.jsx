import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import {Home,AddNew} from './pages'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/new-member" Component={AddNew} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;