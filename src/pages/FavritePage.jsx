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
            <Link to={`/book/${book.id}`}>View Details</Link>
            <button
              onClick={() => handleRemove(book.id)}
              className={styles.remove_button}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavritePage;
