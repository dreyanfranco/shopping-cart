import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import { ItemDetails } from './pages/ItemsDetails/ItemDetails';
import { ItemsPage } from './pages/ItemsPage/ItemsPage';

function App() {
  return (

    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/itemspage' element={<ItemsPage />} />
      <Route path='/itemdetails' element={<ItemDetails />} />
    </Routes>

  );
}

export default App;
