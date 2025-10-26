import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBooks from "./UseBooks";
export default function BestSeller({ id }) {
  const [startIndex, setStartIndex] = useState(0);
  const { books } = useBooks("best-seller", 0, 3);

  const visibleCount = 4;
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/category/best-seller");
  };

  return (
    <section className="bestSeller" id={id}>
      <div className="bestSeller-title">
        <h2>Best Seller</h2>
        <button onClick={handleViewAll}>View All</button>
      </div>

      <div className="bestSeller-cart">
        {books.map((book, i) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            style={{ textDecoration: "none" }}
          >
            <div className="bestSeller-each-cart">
              <img
                src={book.cover_i}
                alt={book.title}
                onError={(e) => (e.target.src = "/t5.jpg")}
              />
              <div className="bestSeller-each-cart-text">
                <h4>{book.title}</h4>
                <p>{book.author_name ? book.author_name : "Unknown"}</p>
                <span>{book.price} $</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
