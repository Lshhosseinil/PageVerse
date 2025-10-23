import { useState } from "react";
import useBooks from "./UseBooks";
import { Link, useNavigate } from "react-router-dom";
export default function Classic({ id }) {
  const { books } = useBooks("Classic", 0, 3);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/category/Classic");
  };
  // function handleNext() {
  //   if (startIndex + visibleCount < books.length) {
  //     setStartIndex((s) => s + 1);
  //   } else {
  //     setStartIndex(0);
  //   }
  // }
  // function handlePrev() {
  //   if (startIndex > 0) {
  //     setStartIndex((s) => s - 1);
  //   } else if (startIndex === 0) {
  //     setStartIndex(books.length - 4);
  //   }
  // }
  // const visibleBooks = books.slice(startIndex, startIndex + visibleCount);
  // console.log(visibleBooks);
  return (
    <section className="classic" style={{ marginTop: "50px" }} id={id}>
      <div className="classic-title">
        <h2>Classic</h2>
        <button onClick={handleViewAll}>View All</button>
      </div>
      {/* <button className="prevSection" onClick={handlePrev}>
        <i className="bi bi-chevron-compact-left"></i>
      </button> */}
      <div className="classic-cart">
        {books.map((book, i) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            style={{ textDecoration: "none" }}
          >
            <div key={i} className="classic-each-cart">
              <img
                src={book.cover_i}
                alt={book.title}
                onError={(e) => (e.target.src = "/t5.jpg")}
              />
              <div className="classic-each-cart-text">
                <h4>{book.title}</h4>
                <p>{book.author_name ? book.author_name : "Unknown"}</p>
                <span>{book.price} $</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* <button className="nextSection" onClick={handleNext}>
        <i className="bi bi-chevron-compact-right"></i>
      </button> */}
    </section>
  );
}
