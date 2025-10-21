import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import styles from "./CategoryPage.module.css";
function CategoryPage() {
  const { name } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("category", name);

      if (!error) setBooks(data);
    }

    fetchBooks();
  }, [name]);

  return (
    <>
      <Header />

      <div className={styles.category}>
        <a className={styles.category_title} onClick={() => navigate(-1)}>
          ← {name}
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

export default CategoryPage;
