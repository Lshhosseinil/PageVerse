import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./FavritePage.module.css";

function FavritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);
  const handleRemove = (id) => {
    const updated = favorites.filter((book) => book.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className={styles.favorites_page}>
      <h2>Your Favorite Books</h2>
      <div className={styles.book_grid}>
        {favorites.map((book) => (
          <div key={book.id} className={styles.book_card}>
            <img src={book.cover_i} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author_name}</p>
            <p>
              <Link to={`/book/${book.id}`}>View Details</Link>
            </p>
            <span
              onClick={() => handleRemove(book.id)}
              className={styles.remove_button}
            >
              Remove
            </span>
            <span
              className={styles.Add_cart}
              onClick={() => {
                const shopping =
                  JSON.parse(localStorage.getItem("AddList")) || [];
                const exist = shopping.find((item) => item.id === book.id);
                if (!exist) {
                  shopping.push(book);
                  localStorage.setItem("AddList", JSON.stringify(shopping));
                  alert("Added to List!");
                } else {
                  alert("Already in List");
                }
              }}
            >
              <i className="bi bi-cart3"></i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavritePage;
