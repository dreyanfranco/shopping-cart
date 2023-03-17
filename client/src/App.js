import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import { ItemDetails } from './pages/ItemsDetails/ItemDetails';
import { ItemsPage } from './pages/ItemsPage/ItemsPage';
import Home from "./pages/Home/Home";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/itemspage' element={<ItemsPage />} />
        <Route path='/itemdetails' element={<ItemDetails />} />
      </Routes>
    </>

  );
}

export default App;
