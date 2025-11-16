import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import supabase from "./supabaseClient";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import CategoryPage from "./pages/CategoryPage";
import FavritePage from "./pages/FavritePage";
import ShoppingCart from "./pages/ShoppingCart";
import AuthPage from "./pages/AuthPage";
import { useEffect, useState } from "react";
import useBooks from "./component/UseBooks";
import Checkout from "./pages/Checkout";
import ExpensiveBooks from "./pages/ExpensiveBooks";
import CheapBooks from "./pages/CheapBooks";
import CheapBooksFiltered from "./pages/CheapBooksFiltered";
import ExpensiveBooksFiltered from "./pages/ExpensiveBooksFiltered";
import Sidebar from "./component/Sidebar";
import Dashboard from "./component/Dashboard";
import Books from "./component/Books";
import Users from "./component/Users";
import Favorites from "./component/Favorites";
import Cart from "./component/Cart";

const images = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"];

function App() {
  const [current, setCurent] = useState(0);
  const { books, isLoading, error } = useBooks();
  function goToSlide(current) {
    setCurent(current);
  }
  function handlePrev() {
    if (current > 0) {
      setCurent((prev) => prev - 1);
    } else if (current === 0) {
      setCurent(images.length - 1);
    }
  }
  function handleNext() {
    if (current < images.length - 1) {
      setCurent((next) => next + 1);
    } else if (current === images.length - 1) {
      setCurent(0);
    }
  }
  /////////////////////
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setUserRole(profile?.role);
      }
      setLoading(false);
    }
    checkRole();
  }, []);
  ///////////////////////////

  return (
    <BrowserRouter basename="/PageVerse">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              current={current}
              setCurent={setCurent}
              onGoToSlide={goToSlide}
              onHandlePrev={handlePrev}
              onHandleNext={handleNext}
              isLoading={isLoading}
              error={error}
              books={books}
            />
          }
        />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/favarite" element={<FavritePage />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/Auth" element={<AuthPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/expensive-books" element={<ExpensiveBooks />} />
        <Route path="/cheap-books" element={<CheapBooks />} />
        <Route path="/cheap-books/:category" element={<CheapBooksFiltered />} />
        <Route
          path="/expensive-books/:category"
          element={<ExpensiveBooksFiltered />}
        />
        {/* ///////admin */}
        <Route
          path="/admin/*"
          element={
            loading ? (
              <p>Loading...</p>
            ) : userRole === "admin" ? (
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="books" element={<Books />} />
                  <Route path="users" element={<Users />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="cart" element={<Cart />} />
                </Routes>
              </div>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
