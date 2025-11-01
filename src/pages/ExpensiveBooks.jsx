import { useEffect, useState } from "react";
import styles from "./ExpensiveBooks.module.css";
import Header from "../component/Header";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ExpensiveBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchExpensiveBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .gt("price", 100);

      if (error) {
        console.error("Error fetching expensive books:", error.message);
      } else {
        setBooks(data);
      }
    }

    fetchExpensiveBooks();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.category}>
        <a className={styles.category_title} onClick={() => navigate(-1)}>
          ← ExpensiveBooks
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

export default ExpensiveBooks;
