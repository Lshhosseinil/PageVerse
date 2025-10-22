import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
function ShoppingCart() {
  const [list, setList] = useState([]);
  useEffect(function () {
    const stored = JSON.parse(localStorage.getItem("AddList")) || [];
    setList(stored);
  }, []);
  const handleRemove = (id) => {
    const updated = list.filter((book) => book.id !== id);
    localStorage.setItem("AddList", JSON.stringify(updated));
    setList(updated);
  };

  return (
    <div className={styles.favorites_page}>
      <h2>Your List</h2>
      <div className={styles.book_grid}>
        {list.map((book) => (
          <div key={book.id} className={styles.book_card}>
            <span
              onClick={() => handleRemove(book.id)}
              className={styles.remove_button}
            >
              <i className="bi bi-x-lg"></i>
            </span>
            <img src={book.cover_i} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author_name}</p>
            <p>
              <Link to={`/book/${book.id}`}>View Details</Link>
            </p>
            <p
              className={styles.Add_cart}
              style={{ color: "white", fontSize: "17px" }}
            >
              {book.price} $ Buy Now
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCart;
