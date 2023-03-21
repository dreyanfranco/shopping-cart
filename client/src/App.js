import { Routes, Route } from "react-router-dom";
import ItemDetails from './pages/ItemsDetails/ItemDetails';
import ItemsPage from './pages/ItemsPage/ItemsPage';
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import CartProvider from "./context/ShoppingCartContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/itemspage' element={<ItemsPage />} />
            <Route path='/itemdetails/:product_id' element={<ItemDetails />} />
          </Routes>
        </CartProvider>
      </QueryClientProvider>
    </>

  );
}

export default App;
