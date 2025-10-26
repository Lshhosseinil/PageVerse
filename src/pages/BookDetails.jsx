import styles from "./BookDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "../component/Header";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";

function BookDetails() {
  const { id } = useParams();
  const numericId = Number(id);
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", numericId)
        .single();

      if (error) setError(error.message);
      else setBook(data);
      setIsLoading(false);
    }

    fetchBook();
  }, [numericId]);
  const handleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("please login first");
    const { data: exist } = await supabase
      .from("favarites")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", book.id)
      .single();
    if (exist) {
      alert("Already in favorites");
    } else {
      const { error } = await supabase
        .from("favarites")
        .insert([{ user_id: user.id, book_id: book.id }]);
      if (error) alert(error.message);
      else {
        setIsFavorite(true);
        alert("Added to favorites!");
      }
    }
  };
  async function handleShopping(bookId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("please login first");
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("stock")
      .eq("id", bookId)
      .single();
    if (bookError || !bookData) return alert("book not found");
    const oldStock = bookData.stock;

    const newStock = oldStock - 1;
    if (newStock < 0) return alert("Out of Stock");

    const { error: updateError } = await supabase
      .from("books")
      .update({ stock: newStock })
      .eq("id", bookId);
    if (updateError) {
      return alert(updateError.message);
    }

    if (newStock < oldStock) {
      console.log("📉 موجودی کتاب کم شد:", oldStock, "→", newStock);
    }

    const { data: exists } = await supabase
      .from("shopping-cart")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", book.id)
      .maybeSingle();
    if (exists) {
      alert("Already in cart");
    } else {
      const { error } = await supabase
        .from("shopping-cart")
        .insert([{ user_id: user.id, book_id: book.id, quantity: 1 }]);

      if (error) alert("Error adding to cart");
      else alert("Added to cart!");
    }
    if (newStock <= 5) {
      await supabase.from("notifications").insert({
        type: "low_stock",
        message: `the stock of the book with ID ${bookId} has reached ${newStock}`,
        for_role: "admin",
      });
    }
  }

  if (isLoading) return <Loader top={400} />;
  if (error) return <ErrorMessage top={400} message={error} />;
  if (!book) return <p>Book not found</p>;

  return (
    <>
      <Header />
      <div className={styles.book_details}>
        <div className={styles.book_cover}>
          <img src={book.cover_i} alt={book.title} />
        </div>
        <div className={styles.book_info}>
          <a className={styles.back_link} onClick={() => navigate(-1)}>
            ← Book Details
          </a>
          <div className={styles.title_row}>
            <div>
              <h1>{book.title}</h1>
              <h3>{book.author_name}</h3>
            </div>
            <button className={styles.heart_button} onClick={handleFavorite}>
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          <h2>Summary</h2>
          <p className="summary">{book.description}</p>
          <button
            className={styles.buy_button}
            onClick={() => handleShopping(book.id)}
          >
            Add to List
          </button>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
