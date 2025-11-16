import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import styles from "./CheapBooksFiltered.module.css";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
export default function CheapBooksFiltered() {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .lt("price", 100)
        .ilike("category", category);

      if (error) {
        console.error("Error fetching cheap books:", error.message);
      } else {
        setBooks(data);
        console.log(data);
      }

      setLoading(false);
    }

    fetchBooks();
  }, [category]);

  if (loading) return <Loader top={400} />;

  return (
    <>
      <Header />
      <div className={styles.category}>
        <a className={styles.category_title} onClick={() => navigate(-1)}>
          ← Books Under $100 - {category.toUpperCase()}
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
