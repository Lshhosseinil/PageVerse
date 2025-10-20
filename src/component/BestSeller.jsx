import { useState } from "react";

export default function BestSeller({ books, id }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  function handleNext() {
    if (startIndex + visibleCount < books.length) {
      setStartIndex((s) => s + 1);
    } else {
      setStartIndex(0);
    }
  }
  function handlePrev() {
    if (startIndex > 0) {
      setStartIndex((s) => s - 1);
    } else if (startIndex === 0) {
      setStartIndex(books.length - 4);
    }
  }
  const visibleBooks = books.slice(startIndex, startIndex + visibleCount);
  return (
    <section
      className="bestSeller"
      // style={{
      //   backgroundColor: "purple",
      //   bottom: "200px",
      //   position: "relative",
      // }}
      id={id}
    >
      <div className="bestSeller-title">
        <h2>Best Seller</h2>
        <button>View All</button>
      </div>
      <button className="prevSection" onClick={handlePrev}>
        <i className="bi bi-chevron-compact-left"></i>
      </button>
      <div className="bestSeller-cart">
        {visibleBooks.map((book, i) => (
          <div key={i} className="bestSeller-each-cart">
            <img
              src={book.cover_i}
              alt={book.title}
              onError={(e) => (e.target.src = "/t5.jpg")}
            />
            <div className="bestSeller-each-cart-text">
              <h4>{book.title}</h4>
              <p>{book.author_name ? book.author_name : "Unknown"}</p>
              <span>{(Math.random() * 200 + 50).toFixed(2)}$</span>
            </div>
          </div>
        ))}
      </div>
      <button className="nextSection" onClick={handleNext}>
        <i className="bi bi-chevron-compact-right"></i>
      </button>
    </section>
  );
}
