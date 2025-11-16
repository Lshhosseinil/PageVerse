import { useState } from "react";
import useBooks from "./UseBooks";
import { Link, useNavigate } from "react-router-dom";

export default function Children({ id }) {
  const { books } = useBooks("Children", 0, 3);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/category/Children");
  };

  return (
    <section className="children" style={{ marginTop: "50px" }} id={id}>
      <div className="children-title">
        <h2>Children</h2>
        <button onClick={handleViewAll}>View All</button>
      </div>

      <div className="children-cart">
        {books.map((book, i) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            style={{ textDecoration: "none" }}
          >
            <div key={i} className="children-each-cart">
              <img
                src={book.cover_i}
                alt={book.title}
                onError={(e) => (e.target.src = "/t5.jpg")}
              />
              <div className="children-each-cart-text">
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
