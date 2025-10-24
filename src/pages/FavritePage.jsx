import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import styles from "./FavritePage.module.css";

function FavritePage() {
  const [favorites, setFavorites] = useState([]);
  async function fetchFavorites() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please login first");

    const { data, error } = await supabase
      .from("favarites")
      .select("book_id, books(title, author_name, cover_i)")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching favorites:", error.message);
    } else {
      const formatted = data.map((item) => ({
        id: item.book_id,
        title: item.books.title,
        author_name: item.books.author_name,
        cover_i: item.books.cover_i,
      }));
      setFavorites(formatted);
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (bookId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please login first");

    const { error } = await supabase
      .from("favarites")
      .delete()
      .eq("user_id", user.id)
      .eq("book_id", bookId);

    if (error) {
      alert("Error removing from favorites");
    } else {
      fetchFavorites();
    }
  };
  const handleAddToCart = async (book) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please login first");

    const { data: exists } = await supabase
      .from("shopping-cart")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", book.id)
      .single();

    if (exists) {
      alert("Already in cart");
    } else {
      const { error } = await supabase
        .from("shopping-cart")
        .insert([{ user_id: user.id, book_id: book.id, quantity: 1 }]);

      if (error) alert("Error adding to cart");
      else alert("Added to cart!");
    }
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
              onClick={() => handleAddToCart(book)}
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
