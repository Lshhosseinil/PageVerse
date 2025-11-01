import styles from "./CheapBooks.module.css";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../component/Header";
function CheapBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCheapBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .lt("price", 100);

      if (error) {
        console.error("Error fetching cheap books:", error.message);
      } else {
        setBooks(data);
      }

      setLoading(false);
    }

    fetchCheapBooks();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.category}>
        <a className={styles.category_title} onClick={() => navigate(-1)}>
          ← CheapBooks
        </a>
        <div className={styles.category_cart}>
          {books.map((book, i) => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              style={{ textDecoration: "none" }}
            >
              <div key={i} className={styles.category_each_cart}>
                <img
                  src={book.cover_i}
                  alt={book.title}
                  onError={(e) => (e.target.src = "/t5.jpg")}
                />
                <div className={styles.category_each_cart_text}>
                  <h4>{book.title}</h4>
                  <p>{book.author_name ? book.author_name : "Unknown"}</p>
                  <span>{book.price} $</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default CheapBooks;
