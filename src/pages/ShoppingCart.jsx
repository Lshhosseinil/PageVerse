import { useEffect, useState } from "react";
import styles from "./ShoppingCart.module.css";
import supabase from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
function ShoppingCart() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  async function fetchCart() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please login first");

    const { data, error } = await supabase
      .from("shopping-cart")
      .select("book_id, quantity, books(title, author_name, cover_i, price)")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error.message);
    } else {
      const formatted = data.map((item) => ({
        id: item.book_id,
        title: item.books.title,
        author_name: item.books.author_name,
        cover_i: item.books.cover_i,
        price: item.books.price,
        quantity: item.quantity,
      }));
      setList(formatted);
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);
  const handleRemove = async (bookId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please login first");

    const { error } = await supabase
      .from("shopping-cart")
      .delete()
      .eq("user_id", user.id)
      .eq("book_id", bookId);

    if (error) {
      alert("Error removing from cart");
    } else {
      fetchCart();
    }
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
              onClick={() => navigate("/checkout")}
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
