import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import CategoryPage from "./pages/CategoryPage";
import FavritePage from "./pages/FavritePage";
import { useState } from "react";
import useBooks from "./component/UseBooks";

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

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
