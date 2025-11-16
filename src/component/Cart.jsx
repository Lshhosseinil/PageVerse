import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "./Cart.module.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
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
    const [cartRes, bookRes, userRes] = await Promise.all([
      supabase.from("shopping-cart").select("*"),
      supabase.from("books").select("id, title, category"),
      supabase.from("profiles").select("id, email"),
    ]);

    if (cartRes.error || bookRes.error || userRes.error) {
      setErrorMsg("Failed to load data.");
    } else {
      setCartItems(cartRes.data);
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

  async function handleAddItem(e) {
    e.preventDefault();
    if (!selectedUser || !selectedBook) return;
    const { error } = await supabase.from("shopping-cart").insert({
      user_id: selectedUser,
      book_id: selectedBook,
    });
    if (error) {
      setErrorMsg("Failed to add item.");
    } else {
      setSelectedUser("");
      setSelectedBook("");
      fetchData();
    }
  }

  async function handleDeleteItem(id) {
    const { error } = await supabase
      .from("shopping-cart")
      .delete()
      .eq("id", id);
    if (error) {
      setErrorMsg("Failed to delete item.");
    } else {
      fetchData();
    }
  }

  const filteredItems = cartItems.filter((item) => {
    const email = getUserEmail(item.user_id).toLowerCase();
    const title = getBookTitle(item.book_id).toLowerCase();
    return (
      email.includes(searchTerm.toLowerCase()) ||
      title.includes(searchTerm.toLowerCase())
    );
  });

  const groupedItems = {};
  filteredItems.forEach((item) => {
    if (!groupedItems[item.user_id]) groupedItems[item.user_id] = [];
    groupedItems[item.user_id].push(item);
  });

  const booksByCategory = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1>Cart Items</h1>

      {loading && <p className={styles.loading}>Loading...</p>}
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}

      <form onSubmit={handleAddItem} className={styles.form}>
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
          Add to Cart
        </button>
      </form>

      <input
        className={styles.search}
        placeholder="Search by email or book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {users.map((user) => {
        const userItems = groupedItems[user.id] || [];
        if (userItems.length === 0) return null;

        return (
          <div key={user.id} className={styles.userBlock}>
            <h2 className={styles.userEmail}>
              {user.email} ({userItems.length})
            </h2>
            <ul className={styles.bookList}>
              {userItems.map((item) => (
                <li key={item.id} className={styles.bookItem}>
                  {getBookTitle(item.book_id)}
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteItem(item.id)}
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
