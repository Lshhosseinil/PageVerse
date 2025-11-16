import { useEffect, useState } from "react";
import styles from "./Favorites.module.css";
import supabase from "../supabaseClient";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [favRes, bookRes, userRes] = await Promise.all([
      supabase.from("favarites").select("*"),
      supabase.from("books").select("id, title, category"),
      supabase.from("profiles").select("id, email"),
    ]);

    if (favRes.error || bookRes.error || userRes.error) {
      setErrorMsg("Failed to load data.");
    } else {
      setFavorites(favRes.data);
      setBooks(bookRes.data);
      setUsers(userRes.data);
    }

    setLoading(false);
  }

  function getBookTitle(book_id) {
    const book = books.find((b) => b.id === book_id);
    return book ? book.title : "Unknown";
  }

  function getUserEmail(user_id) {
    const user = users.find((u) => u.id === user_id);
    return user ? user.email : "Unknown";
  }

  async function handleAddFavorite(e) {
    e.preventDefault();
    if (!selectedUser || !selectedBook) return;
    const { error } = await supabase.from("favarites").insert({
      user_id: selectedUser,
      book_id: selectedBook,
    });
    if (error) {
      setErrorMsg("Failed to add favorite.");
    } else {
      setSelectedUser("");
      setSelectedBook("");
      fetchData();
    }
  }

  async function handleDeleteFavorite(id) {
    const { error } = await supabase.from("favarites").delete().eq("id", id);
    if (!error) fetchData();
  }

  const filteredFavorites = favorites.filter((fav) => {
    const email = getUserEmail(fav.user_id).toLowerCase();
    const title = getBookTitle(fav.book_id).toLowerCase();
    return (
      email.includes(searchTerm.toLowerCase()) ||
      title.includes(searchTerm.toLowerCase())
    );
  });

  const groupedFavorites = {};
  filteredFavorites.forEach((fav) => {
    if (!groupedFavorites[fav.user_id]) groupedFavorites[fav.user_id] = [];
    groupedFavorites[fav.user_id].push(fav);
  });

  const booksByCategory = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>

      {loading && <p className={styles.loading}>Loading...</p>}
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}

      <form onSubmit={handleAddFavorite} className={styles.form}>
        <select
          className={styles.select}
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          <option value="">Select Book</option>
          {Object.entries(booksByCategory).map(([category, books]) => (
            <optgroup key={category} label={category}>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <button className={styles.button} type="submit">
          Add Favorite
        </button>
      </form>

      <input
        className={styles.search}
        placeholder="Search by email or book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {users.map((user) => {
        const userFavorites = groupedFavorites[user.id] || [];
        if (userFavorites.length === 0) return null;

        return (
          <div key={user.id} className={styles.userBlock}>
            <h2 className={styles.userEmail}>
              {user.email} ({userFavorites.length})
            </h2>
            <ul className={styles.bookList}>
              {userFavorites.map((fav) => (
                <li key={fav.id} className={styles.bookItem}>
                  {getBookTitle(fav.book_id)}
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteFavorite(fav.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
